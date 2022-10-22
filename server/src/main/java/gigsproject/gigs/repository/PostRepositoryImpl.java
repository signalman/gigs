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


    /**
     * 시간대별 post 조회
     * @param stageSearch
     * @return
     */
    @Override
    public List<Post> getList(StageSearch stageSearch) {

        /**
         * StageSearch 조건에 부합하는 필터링 기능 구현 필요
         * host 와 post fetch join해서 그 결과 정보를 response객체에 담아 전송
         * */

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

