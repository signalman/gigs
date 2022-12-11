package gigsproject.gigs.service;

import gigsproject.gigs.domain.*;
import gigsproject.gigs.request.PostForm;
import gigsproject.gigs.request.StageForm;
import gigsproject.gigs.response.HostResponse;
import gigsproject.gigs.response.PostResponse;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.TestExecutionEvent;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
@Transactional
public class StageServiceTest {

    @Autowired
    HostService hostService;
    @Autowired
    PostService postService;
    @Autowired
    EntityManager em;
    private Host host;
    private User user;

    @BeforeEach
    void setup() {
        user = User.builder()
                .name("test")
                .role(Role.ROLE_HOST)
                .build();
        em.persist(user);

        host = Host.builder()
                .user(user)
                .stageName("기존 제목")
                .pay(1000)
                .build();

        em.persist(host);

    }

    @Test
    @DisplayName("무대 등록 + 수정 테스트")
    void hostSave() throws Exception {
        //given
        StageForm stageForm = StageForm.builder()
                .name("수정된 이름입니다.")
                .introduce("수정된 내용입니다.")
                .pay(1)
                .build();

        //expected
        assertThat(host.getPay()).isEqualTo(1000);
        Long edit = hostService.edit(user, stageForm);

        assertThat(edit).isEqualTo(host.getHostId());
        HostResponse response = hostService.findHost(edit);
        assertThat(response.getName()).isEqualTo("수정된 이름입니다.");
        assertThat(response.getPay()).isEqualTo(1);
    }

    @Test
    @DisplayName("포스트 등록")
    void postSave () throws Exception{
        //given
        PostForm postForm = PostForm.builder()
                .genre(Genre.ROCK)
                .date(LocalDate.of(2022, 11, 25))
                .startTime(LocalTime.NOON)
                .startTime(LocalTime.MIDNIGHT)
                .build();

        //when
        Post post = host.createPost(postForm);

        //then
        assertThat(post.getHost()).isEqualTo(host);
        assertThat(post.getDate()).isEqualTo(LocalDate.of(2022, 11, 25));
    }
    @Test
    @DisplayName("무대 상세 페이지 조회")
    void stageInfo () throws Exception{
        //given
        PostForm postForm1 = PostForm.builder()
                .genre(Genre.ROCK)
                .date(LocalDate.of(2022, 11, 25))
                .startTime(LocalTime.NOON)
                .endTime(LocalTime.MIDNIGHT)
                .build();
        PostForm postForm2 = PostForm.builder()
                .genre(Genre.HIPHOP)
                .date(LocalDate.of(2022, 11, 25))
                .startTime(LocalTime.NOON)
                .endTime(LocalTime.MIDNIGHT)
                .build();

        postService.write(user, postForm1);
        postService.write(user, postForm2);
        //when
        HostResponse hostResponse = hostService.findHost(host.getHostId());

        List<PostResponse> posts = hostResponse.getPosts();

        //then
        assertThat(hostResponse.getUserId()).isEqualTo(user.getUserId());
        assertThat(posts.size()).isEqualTo(1);



    }

}
