package gigsproject.gigs.repository;

import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import gigsproject.gigs.domain.Post;
import gigsproject.gigs.domain.QHost;
import gigsproject.gigs.domain.QPost;
import gigsproject.gigs.request.StageSearch;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import static gigsproject.gigs.domain.QHost.host;
import static gigsproject.gigs.domain.QPost.*;
import static java.util.Objects.isNull;
import static org.springframework.util.StringUtils.hasText;

@Repository
@RequiredArgsConstructor
public class PostRepositoryImpl implements PostRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<Post> getList(StageSearch stageSearch) {

        QPost p = post;

        return jpaQueryFactory.selectFrom(p)
                .join(p.host, host)
                .fetchJoin()
                .where(
                        stageNameEq(stageSearch.getName()),
                        stageTimeEq(stageSearch.getStartTime(), stageSearch.getEndTime(), p)
                )
                .limit(stageSearch.getSize())
                .offset(stageSearch.getOffset())
                .orderBy(p.id.desc())
                .fetch();

    }

    private Predicate stageNameEq(String name) {
        return hasText(name) ? post.host.stageName.eq(name) : null;
    }

    /**
     * null 값에 대한 테스트 검증 필요
     * @param startSearchTime
     * @param endSearchTime
     * @param p
     * @return
     */
    private Predicate stageTimeEq(String startSearchTime, String endSearchTime, QPost p) {

        LocalDateTime startTime = hasText(startSearchTime) ? LocalDateTime.parse(startSearchTime, DateTimeFormatter.ISO_LOCAL_DATE_TIME) : null;
        LocalDateTime endTime = hasText(endSearchTime) ? LocalDateTime.parse(endSearchTime, DateTimeFormatter.ISO_LOCAL_DATE_TIME) : null;

        if (startTime == null) {
            if (endTime == null) {
                return null;
            } else {
                return post.showEndTime.before(endTime);
            }
        } else {
            if (startTime == null) {
                return post.showStartTime.after(startTime);
            }
            return p.showStartTime.after(startTime).and(p.showEndTime.before(endTime));
        }
    }
}

