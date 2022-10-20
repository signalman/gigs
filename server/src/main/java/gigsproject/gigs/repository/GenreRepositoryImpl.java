package gigsproject.gigs.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

@Repository
public class GenreRepositoryImpl implements GenreCustomRepository{
    private final JPAQueryFactory jpaQueryFactory;
    public GenreRepositoryImpl(EntityManager em) {
        this.jpaQueryFactory = new JPAQueryFactory(em);
    }


}
