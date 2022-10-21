package gigsproject.gigs.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import gigsproject.gigs.domain.Post;
import gigsproject.gigs.domain.QPost;
import gigsproject.gigs.request.StageSearch;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

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
        return jpaQueryFactory.selectFrom(QPost.post)
                .limit(stageSearch.getSize())
                .offset(stageSearch.getOffset())
                .orderBy(QPost.post.id.desc())
                .fetch();
    }
}

