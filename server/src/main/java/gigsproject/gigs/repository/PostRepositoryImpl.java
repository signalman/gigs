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

import javax.persistence.EntityManager;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

import static gigsproject.gigs.domain.QHost.host;
import static gigsproject.gigs.domain.QPost.post;
import static java.util.Objects.isNull;
import static org.springframework.util.StringUtils.hasText;
import static org.springframework.util.StringUtils.isEmpty;

@Repository
@RequiredArgsConstructor
@Slf4j
public class PostRepositoryImpl implements PostRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    private final EntityManager em;

    @Override
    public Page<StageCard> getList(StageSearch stageSearch, Pageable pageable) {

        QHost host = QHost.host;
        List<Post> posts = jpaQueryFactory.select(post)
                .from(post)
                .join(post.host, host)
                .fetchJoin()
                .where(
                        stageNameEq(stageSearch.getName()),
                        stageTypeEq(stageSearch.getStageTypes()),
                        stageGenreEq(stageSearch.getGenres()),
                        stageTargetGenderEq(stageSearch.getTargetGender()),
                        starAddressEq(stageSearch.getAddress()),
                        stageTimeEq(stageSearch.getStartTime(), stageSearch.getEndTime()),
                        stageTargetAgeEq(stageSearch.getTargetAge()),
                        stageTargetMinCountEq(stageSearch.getTargetMinCount())
                )
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(post.id.desc())
                .fetch();

        List<StageCard> content = posts.stream()
                .map(post -> new StageCard(post))
                .collect(Collectors.toList());

        JPAQuery<Long> countQuery = jpaQueryFactory
                .select(post.count())
                .from(post)
                .where(
                        stageNameEq(stageSearch.getName()),
                        stageTypeEq(stageSearch.getStageTypes()),
                        stageGenreEq(stageSearch.getGenres()),
                        stageTargetGenderEq(stageSearch.getTargetGender()),
                        starAddressEq(stageSearch.getAddress()),
                        stageTimeEq(stageSearch.getStartTime(), stageSearch.getEndTime()),
                        stageTargetAgeEq(stageSearch.getTargetAge()),
                        stageTargetMinCountEq(stageSearch.getTargetMinCount())

                );

        return PageableExecutionUtils.getPage(content, pageable, countQuery::fetchOne);
    }

    private Predicate stageTargetMinCountEq(Integer targetMinCount) {
        return isNull(targetMinCount) ? null : post.host.targetNumber.goe(targetMinCount);
    }

    private Predicate stageTargetAgeEq(Integer targetAge) {
        return isNull(targetAge) ? null : post.host.targetAge.eq(targetAge);
    }

    private Predicate stageTargetGenderEq(Gender targetGender) {
        return isNull(targetGender) ? null : post.host.targetGender.eq(targetGender);
    }

    private Predicate stageTypeEq(List<StageType> stageTypes) {
        return isEmpty(stageTypes) ? null : post.host.stageType.in(stageTypes);
    }

    private Predicate stageGenreEq(List<Genre> genres) {
        return isEmpty(genres) ? null : post.host.hostGenres.any().genre.in(genres);
    }

    private Predicate starAddressEq(String address) {
        return hasText(address) ? host.user.address.cityName.eq(address) : null;
    }

    private Predicate stageNameEq(String name) {
        return hasText(name) ? post.host.stageName.eq(name) : null;
    }

    private Predicate stageTimeEq(String startSearchTime, String endSearchTime) {

        LocalDateTime startTime = hasText(startSearchTime) ? LocalDateTime.parse(startSearchTime, DateTimeFormatter.ISO_LOCAL_DATE_TIME) : null;
        LocalDateTime endTime = hasText(endSearchTime) ? LocalDateTime.parse(endSearchTime, DateTimeFormatter.ISO_LOCAL_DATE_TIME) : null;

        if (startTime == null) {
            if (endTime == null) {
                // x <= <= x
                return null;
            } else {
                // x <=  <= o
                return post.showEndTime.loe(endTime);
            }
        } else {
            if (endTime == null) {
                //o <=  <= x
                return post.showStartTime.goe(startTime);
            }
            //o <= <= o
            return post.showStartTime.goe(startTime).and(post.showEndTime.loe(endTime));
        }
    }
}

