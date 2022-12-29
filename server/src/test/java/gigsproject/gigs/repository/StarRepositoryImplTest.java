package gigsproject.gigs.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import gigsproject.gigs.domain.*;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

import static gigsproject.gigs.domain.QStar.star;
import static org.junit.jupiter.api.Assertions.*;
//@SpringBootTest
@Transactional
@WebMvcTest
class StarRepositoryImplTest {

    @PersistenceContext
    EntityManager em;
    JPAQueryFactory queryFactory;
    @Autowired
    MockMvc mockMvc;

    @BeforeEach
    public void before(){
        queryFactory = new JPAQueryFactory(em);
    }

    @Test
    public void 장르_저장() {

//        Genre genre1 = new Genre(null, "pop");
//        Genre genre2 = new Genre(null, "hip-hop");

    }

}