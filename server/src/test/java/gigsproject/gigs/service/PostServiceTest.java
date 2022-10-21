package gigsproject.gigs.service;

import gigsproject.gigs.domain.Host;
import gigsproject.gigs.domain.Post;
import gigsproject.gigs.repository.HostRepository;
import gigsproject.gigs.repository.PostRepository;
import gigsproject.gigs.request.StageSearch;
import gigsproject.gigs.response.StageCard;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static org.assertj.core.api.Assertions.assertThat;

@Transactional
@SpringBootTest
class PostServiceTest {

    @Autowired PostService postService;
    @Autowired PostRepository postRepository;
    @Autowired HostRepository hostRepository;

    @Test
    @DisplayName("무대 1 페이지 조회")
    void getStages () throws Exception{
        //given
        Host host = Host.builder()
                .build();

        List<Post> requestPosts = IntStream.range(0, 30)
                .mapToObj(i -> {
                    return Post.builder()
                            .host(host)
                            .build();
                })
                .collect(Collectors.toList());

        //when
        postRepository.saveAll(requestPosts);

        StageSearch postSearch = StageSearch.builder()
                .page(1)
                .size(10)
                .build();

        List<StageCard> responseList = postService.getList(postSearch);

        //then
        assertThat(postRepository.count()).isEqualTo(30);
        assertThat(responseList.size()).isEqualTo(10L);
        assertThat(responseList.get(0).getHostId()).isEqualTo(host.getHostId());

    }

}