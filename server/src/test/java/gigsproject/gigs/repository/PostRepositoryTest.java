package gigsproject.gigs.repository;

import gigsproject.gigs.domain.Post;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class PostRepositoryTest {

    @Autowired PostRepository postRepository;

    @Test
    @DisplayName("Querydsl 정상 작동 테스트")
    void querydslTest () throws Exception{
        //given
        Post post = Post.builder().build();

        //when
        postRepository.save(post);

        //then
    }

}