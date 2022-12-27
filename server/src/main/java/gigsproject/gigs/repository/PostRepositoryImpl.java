package gigsproject.gigs.repository;

import com.querydsl.core.types.Predicate;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import gigsproject.gigs.domain.*;
import gigsproject.gigs.request.StageSearch;
import gigsproject.gigs.response.StageCard;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

import static gigsproject.gigs.domain.PostStatus.UNSIGNED;
import static gigsproject.gigs.domain.QHost.host;
import static gigsproject.gigs.domain.QPost.post;
import static java.util.Objects.isNull;
import static org.springframework.util.StringUtils.hasText;

@Repository
@RequiredArgsConstructor
@Slf4j
public class PostRepositoryImpl implements PostRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public Page<StageCard> getList(StageSearch stageSearch, Pageable pageable) {
        QPost post = QPost.post;
        List<Host> hosts = jpaQueryFactory.selectFrom(host)
                .join(host.posts, post)
                .fetchJoin()
                .where(
                        stageNameContains(stageSearch.getName()),
                        stageTypeEq(stageSearch.getStageTypes()),
                        stageGenreEq(stageSearch.getGenres()),
                        stageTargetGenderEq(stageSearch.getTargetGender()),
                        stageAddressSiDoEq(stageSearch.getSiDo()),
                        stageAddressSiGunEq(stageSearch.getSiGun()),
                        stageDateEq(stageSearch.getStartDate(), stageSearch.getEndDate()),
                        stageTimeEq(stageSearch.getStartTime(), stageSearch.getEndTime()),
                        stageTargetAgeEq(stageSearch.getTargetAge()),
                        stageTargetMinCountEq(stageSearch.getTargetMinCount()),
                        post.status.eq(UNSIGNED)
                )
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(host.hostId.desc())
                .fetch();

        List<StageCard> content = hosts.stream()
                .map(StageCard::new)
                .collect(Collectors.toList());

        JPAQuery<Long> countQuery = jpaQueryFactory
                .select(host.count())
                .from(host)
                .where(
                        stageNameContains(stageSearch.getName()),
                        stageTypeEq(stageSearch.getStageTypes()),
                        stageGenreEq(stageSearch.getGenres()),
                        stageTargetGenderEq(stageSearch.getTargetGender()),
                        stageAddressSiDoEq(stageSearch.getSiDo()),
                        stageAddressSiGunEq(stageSearch.getSiGun()),
                        stageDateEq(stageSearch.getStartDate(), stageSearch.getEndDate()),
                        stageTimeEq(stageSearch.getStartTime(), stageSearch.getEndTime()),
                        stageTargetAgeEq(stageSearch.getTargetAge()),
                        stageTargetMinCountEq(stageSearch.getTargetMinCount())
                );
        return PageableExecutionUtils.getPage(content, pageable, countQuery::fetchOne);
    }


    private Predicate stageTargetMinCountEq(Integer targetMinCount) {
        return isNull(targetMinCount) ? null : host.targetNumber.goe(targetMinCount);
    }

    private Predicate stageTargetAgeEq(Integer targetAge) {
        return isNull(targetAge) ? null : host.targetAge.eq(targetAge);
    }


    private Predicate stageTargetGenderEq(Gender targetGender) {
        return isNull(targetGender) ? null : host.targetGender.eq(targetGender);
    }

    private Predicate stageTypeEq(List<StageType> stageTypes) {
        return isNull(stageTypes) ? null : host.stageType.in(stageTypes);
    }

    private Predicate stageGenreEq(List<Genre> genres) {
        return isNull(genres) ? null : post.postGenres.any().genre.in(genres);
    }

    private Predicate stageAddressSiDoEq(String siDo) {
        return hasText(siDo) ? host.stageAddress.siDo.eq(siDo) : null;
    }

    private Predicate stageAddressSiGunEq(String siGun) {
        return hasText(siGun) ? host.stageAddress.siGun.eq(siGun) : null;
    }

    private Predicate stageNameContains(String name) {
        return hasText(name) ? host.stageName.contains(name) : null;
    }

    private Predicate stageDateEq(String searchStartDate, String searchEndDate) {

        LocalDate startDate = hasText(searchStartDate) ? LocalDate.parse(searchStartDate, DateTimeFormatter.ISO_LOCAL_DATE) : null;
        LocalDate endDate = hasText(searchEndDate) ? LocalDate.parse(searchEndDate, DateTimeFormatter.ISO_LOCAL_DATE) : null;

        if (startDate == null) {
            if (endDate == null) {
                return null;
            } else {
                // x <=  <= o
                return post.date.loe(endDate);
            }
        } else {
            if (endDate == null) {
                //o <=  <= x
                return post.date.goe(startDate);
            }
            //o <= <= o
            return post.date.goe(startDate).and(post.date.loe(endDate));
        }
    }


    private Predicate stageTimeEq(String startSearchTime, String endSearchTime) {

        LocalTime startTime = hasText(startSearchTime) ? LocalTime.parse(startSearchTime, DateTimeFormatter.ISO_LOCAL_TIME) : null;
        LocalTime endTime = hasText(endSearchTime) ? LocalTime.parse(endSearchTime, DateTimeFormatter.ISO_LOCAL_TIME) : null;

        if (startTime == null) {
            if (endTime == null) {
                // x <= <= x
                return null;
            } else {
                // x <=  <= o
                return post.endTime.loe(endTime);
            }
        } else {
            if (endTime == null) {
                //o <=  <= x
                return post.startTime.goe(startTime);
            }
            //o <= <= o
            return post.startTime.goe(startTime).and(post.endTime.loe(endTime));
        }
    }

    @Override
    public List<StageCard> findRecentPosts() {
        List<Host> hosts = jpaQueryFactory
                .selectFrom(host)
                .join(host.posts, post)
                .fetchJoin()
                .where(
                        host.stageAddress.isNotNull().and(post.status.eq(UNSIGNED))
                )
                .orderBy(host.hostId.desc())
                .limit(20)
                .fetch();
        return hosts.stream().map(h -> new StageCard(h)).collect(Collectors.toList());
    }
}

