package gigsproject.gigs.service;

import gigsproject.gigs.domain.*;
import gigsproject.gigs.request.PostForm;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.LocalTime;

import static gigsproject.gigs.domain.Genre.ROCK;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class ReviewServiceTest {

    @Autowired
    EntityManager em;

    @BeforeEach
    void setup() {

        User user = User.builder()
                .name("test")
                .role(Role.ROLE_HOST)
                .build();
        em.persist(user);

        Host host = Host.builder()
                .user(user)
                .stageName("기존 제목")
                .build();
        em.persist(host);

        PostGenre postGenre = PostGenre.builder()
                .genre(Genre.HIPHOP)
                .build();
//        Post post = Post.builder()
//                .postGenres()
//                .startTime()
//                .endTime()
//                .build();
//        postForm = PostForm.builder()
//                .genre(ROCK)
//                .date(LocalDate.of(2022, 12, 25))
//                .startTime(LocalTime.of(18, 0))
//                .endTime(LocalTime.of(20, 30))
//                .build();
//        em.persist(post);
//
//        star = Star.builder()
//                .name("스타")
//                .user(user)
//                .build();
//        em.persist(star);
////        Review review = Review.builder()

    }

    @Test
    @DisplayName("리뷰 리스트")
    void getList () throws Exception{
        //given


        //when


        //then
    }


}