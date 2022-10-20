package gigsproject.gigs.service;

import gigsproject.gigs.domain.Host;
import gigsproject.gigs.domain.Post;
import gigsproject.gigs.repository.HostRepository;
import gigsproject.gigs.repository.PostRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@Transactional
@SpringBootTest
class PostServiceTest {

    @Autowired PostService postService;
    @Autowired PostRepository postRepository;
    @Autowired HostRepository hostRepository;


    @Test
    @DisplayName("무대 이름에 대한 포스트 조회")
    void findByHostName () throws Exception{
        //given
        Host host = Host.builder()
                .stageName("host")
                .build();

        Post post1 = Post.builder()
                .host(host)
                .build();

        Post post2 = Post.builder()
                .host(host)
                .build();
        hostRepository.save(host);
        postRepository.save(post1);
        postRepository.save(post2);

        //when
        List<Post> posts = postService.getListByName("host");

        //then
        assertThat(posts.size()).isEqualTo(2);
        assertThat(posts.get(0).getHost().getStageName()).isEqualTo("host");
        assertThat(posts.get(0).getHost()).isEqualTo(posts.get(1).getHost());
    }

}