package gigsproject.gigs.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import gigsproject.gigs.domain.Post;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class PostRepositoryImpl implements PostRepositoryCustom{

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<Post> getList() {
        return null;
    }
}
