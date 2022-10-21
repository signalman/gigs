package gigsproject.gigs.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import gigsproject.gigs.domain.Post;
import gigsproject.gigs.domain.QPost;
import gigsproject.gigs.request.StageSearch;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class PostRepositoryImpl implements PostRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<Post> getList(StageSearch stageSearch) {

        /**
         * StageSearch 조건에 부합하는 필터링 기능 구현 필요
         * Host Repo에서 데이터 필터링 해야할듯
         */

        /**
         * LocalDateTime 변환 로직
         * null처리안되어있음
         * 추후 수정 예정
         */
        LocalDateTime startSearchTime = LocalDateTime.parse(stageSearch.getStartTime(), DateTimeFormatter.ISO_LOCAL_DATE_TIME);
        LocalDateTime endSearchTime = LocalDateTime.parse(stageSearch.getEndTime(), DateTimeFormatter.ISO_LOCAL_DATE_TIME);

        QPost p = QPost.post;

        return jpaQueryFactory.selectFrom(p)
                .where(p.showStartTime.after(startSearchTime).and(p.showEndTime.before(endSearchTime)))
                .limit(stageSearch.getSize())
                .offset(stageSearch.getOffset())
                .orderBy(p.id.desc())
                .fetch();
    }
}

