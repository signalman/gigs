package gigsproject.gigs.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import gigsproject.gigs.domain.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;


@SpringBootTest
@Transactional
class HostRepositoryTest {
    @Autowired
    EntityManager em;

    @Test
    public void querydsl(){
        JPAQueryFactory query = new JPAQueryFactory(em);
        Genre genre = new Genre(null, "hoin");
        em.persist(genre);
    }

}