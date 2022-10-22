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

import java.time.LocalDateTime;
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
    @DisplayName("무대 이름 별 조회")
    void getStages_byName () throws Exception{
        //given
        //동일한 host의 post 30개를 생성, 이를 페이징 처리하여 조회
        Host host = Host.builder()
                .stageName("abc")
                .build();

        List<Post> requestPosts = IntStream.range(0, 24)
                .mapToObj(i -> {
                    return Post.builder()
                            .host(host)
                            .build();
                })
                .collect(Collectors.toList());
        postRepository.saveAll(requestPosts);

        //when

        StageSearch stageSearch = StageSearch.builder()
                .page(1)
                .size(10)
                .build();
        stageSearch.setName("abc");
        List<StageCard> responseList = postService.getList(stageSearch);

        //then
        assertThat(postRepository.count()).isEqualTo(24);
        assertThat(responseList.size()).isEqualTo(10L);
        assertThat(responseList.get(0).getHostId()).isEqualTo(host.getHostId());
        assertThat(responseList.get(0).getStageName()).isEqualTo(host.getStageName());


    }

    @Test
    @DisplayName("무대 시간 별 조회")
    void getStages_byTime () throws Exception{
        //given
        //동일한 host의 post 30개를 생성, 이를 페이징 처리하여 조회
        Host host = Host.builder()
                .build();

        List<Post> requestPosts = IntStream.range(0, 24)
                .mapToObj(i -> {
                    return Post.builder()
                            .host(host)
                            .showStartTime(LocalDateTime.of(2022, 10, 1, 1, 2))
                            .showEndTime(LocalDateTime.of(2022, 10, 1, 5, 6))
                            .build();
                })
                .collect(Collectors.toList());

        Post exceptPost= Post.builder()
                .host(host)
                .showStartTime(LocalDateTime.of(2022, 9, 1, 1, 2))
                .showEndTime(LocalDateTime.of(2022, 9, 1, 5, 6))
                .build();
        requestPosts.add(exceptPost);

        postRepository.saveAll(requestPosts);

        //when

        StageSearch stageSearch = StageSearch.builder()
                .page(1)
                .size(10)
                .build();
        stageSearch.setStartTime(String.valueOf(LocalDateTime.of(2022, 9, 30, 1, 2)));
        stageSearch.setEndTime(String.valueOf(LocalDateTime.of(2022, 10, 3, 5, 6)));

        List<StageCard> responseList = postService.getList(stageSearch);

        //then
        assertThat(responseList.size()).isEqualTo(10L);
        assertThat(responseList.get(0).getHostId()).isEqualTo(host.getHostId());

    }

    @Test
    @DisplayName("무대 이름 + 시간 별 조회")
    void getStages_Name_Time () throws Exception{
        //given
        //동일한 host의 post 30개를 생성, 이를 페이징 처리하여 조회
        Host host = Host.builder()
                .stageName("abc")
                .build();

        List<Post> requestPosts = IntStream.range(0, 24)
                .mapToObj(i -> {
                    return Post.builder()
                            .host(host)
                            .showStartTime(LocalDateTime.of(2022, 10, 1, 1, 2))
                            .showEndTime(LocalDateTime.of(2022, 10, 1, 5, 6))
                            .build();
                })
                .collect(Collectors.toList());
        postRepository.saveAll(requestPosts);

        //when

        StageSearch stageSearch = StageSearch.builder()
                .page(1)
                .size(10)
                .build();

        stageSearch.setName("abc");
        stageSearch.setStartTime(String.valueOf(LocalDateTime.of(2022, 10, 1, 1, 2)));
        stageSearch.setEndTime(String.valueOf(LocalDateTime.of(2022, 10, 1, 5, 6)));

        List<StageCard> responseList = postService.getList(stageSearch);

        //then
        assertThat(postRepository.count()).isEqualTo(24);
        assertThat(responseList.size()).isEqualTo(10L);
        assertThat(responseList.get(0).getHostId()).isEqualTo(host.getHostId());
        assertThat(responseList.get(0).getStageName()).isEqualTo(host.getStageName());

    }

}