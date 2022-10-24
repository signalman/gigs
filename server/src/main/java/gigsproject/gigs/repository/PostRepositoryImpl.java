package gigsproject.gigs.repository;

import com.querydsl.core.types.Predicate;
import com.querydsl.jpa.impl.JPAQueryFactory;
import gigsproject.gigs.domain.Genre;
import gigsproject.gigs.domain.Post;
import gigsproject.gigs.domain.QHost;
import gigsproject.gigs.domain.StageType;
import gigsproject.gigs.request.StageSearch;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import static gigsproject.gigs.domain.QHost.host;
import static gigsproject.gigs.domain.QPost.post;
import static java.util.Objects.isNull;
import static org.springframework.util.StringUtils.hasText;

@Repository
@RequiredArgsConstructor
@Slf4j
public class PostRepositoryImpl implements PostRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    private final EntityManager em;

    @Override
    public List<Post> getList(StageSearch stageSearch) {

        QHost host = QHost.host;

        return jpaQueryFactory.select(post)
                .from(post)
                .join(post.host, host)
                .fetchJoin()
                .where(
                        stageNameEq(stageSearch.getName()),
                        stageTypeEq(stageSearch.getStageTypes()),
                        stageGenreEq(stageSearch.getGenres()),
                        starAddressEq(stageSearch.getAddress()),
                        stageTimeEq(stageSearch.getStartTime(), stageSearch.getEndTime()),
                        stageTargetGenderEq(stageSearch.getTargetGender()),
                        stageTargetAgeEq(stageSearch.getTargetAge()),
                        stageTargetMinCountEq(stageSearch.getTargetMinCount())
                )
                .limit(stageSearch.getSize())
                .offset(stageSearch.getOffset())
                .orderBy(post.id.desc())
                .fetch();

    }

    private Predicate stageTargetMinCountEq(Integer targetMinCount) {
        return isNull(targetMinCount) ? null : post.host.targetNumber.goe(targetMinCount);
    }

    private Predicate stageTargetAgeEq(Integer targetAge) {
        return isNull(targetAge) ? null : post.host.targetAge.eq(targetAge);
    }

    private Predicate stageTargetGenderEq(Integer targetGender) {
        return isNull(targetGender) ? null : post.host.targetGender.eq(targetGender);
    }

    private Predicate stageTypeEq(List<StageType> stageTypes) {
        return isNull(stageTypes) ? null : post.host.stageType.in(stageTypes);
    }

    private Predicate stageGenreEq(List<Genre> genres) {
        return isNull(genres) ? null : post.host.hostGenres.any().genre.in(genres);
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

