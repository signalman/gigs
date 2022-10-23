package gigsproject.gigs.repository;

import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import gigsproject.gigs.domain.Post;
import gigsproject.gigs.domain.QHost;
import gigsproject.gigs.domain.QPost;
import gigsproject.gigs.request.StageSearch;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import static gigsproject.gigs.domain.QHost.host;
import static gigsproject.gigs.domain.QPost.*;
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
                        stageTimeEq(stageSearch.getStartTime(), stageSearch.getEndTime())
                        //장르는 조건 확정된 후 작업 예정
//                        stageTargetEq(stageSearch.getTargetGender(), stageSearch.getTargetAge(), stageSearch.getTargetMinCount())

                )
                .limit(stageSearch.getSize())
                .offset(stageSearch.getOffset())
                .orderBy(post.id.desc())
                .fetch();

    }

    /**
     * JPQL로 구현한 이름 검색
     *
     * @param stageSearch
     * @return
     */
    private List<Post> getListByStageName(StageSearch stageSearch) {
        String query = "SELECT p FROM Post p INNER JOIN p.host h "
                + "WHERE h.stageName = :stageName";
        return em.createQuery(query, Post.class)
                .setParameter("stageName", stageSearch.getName())
                .getResultList();
    }

//    private Predicate stageTargetEq(Integer targetGender, Integer targetAge, Integer targetMinCount) {
//        BooleanExpression genderEq = isNull(targetGender) ? null : post.host.targetGender.eq(targetGender);
//        BooleanExpression ageEq = isNull(targetAge) ? null : post.host.targetAge.eq(targetGender);
//        BooleanExpression minCountEq = isNull(targetMinCount) ? null : post.host.targetNumber.eq(targetMinCount);
//        return ;
//    }

    private Predicate stageTypeEq(List<String> stageTypes) {
        return isNull(stageTypes) ? null : post.host.stageType.name.in(stageTypes);
    }

    private Predicate stageGenreEq(List<String> genres) {
        return isNull(genres) ? null : post.host.hostGenres.any().genre.name.in(genres);
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
                return post.showEndTime.before(endTime);
            }
        } else {
            if (endTime == null) {
                //o <=  <= x
                return post.showStartTime.after(startTime);
            }
            //o <= <= o
            return post.showStartTime.after(startTime).and(post.showEndTime.before(endTime));
        }
    }
}

