package gigsproject.gigs.service;

import gigsproject.gigs.domain.*;
import gigsproject.gigs.request.PostForm;
import gigsproject.gigs.request.StageForm;
import gigsproject.gigs.response.HostResponse;
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
                .build();

        em.persist(host);

    }

    @Test
    @DisplayName("무대 등록 + 수정 테스트")
    @WithMockUser(username = "test1", setupBefore = TestExecutionEvent.TEST_EXECUTION)
    void hostSave() throws Exception {
        //given
        StageForm stageForm = StageForm.builder()
                .stageName("수정된 이름입니다.")
                .stageInfo("수정된 내용입니다.")
                .build();

        //expected
        Long edit = hostService.edit(user, stageForm);

        assertThat(edit).isEqualTo(host.getHostId());

        HostResponse response = hostService.findHost(edit);
        assertThat(response.getName()).isEqualTo("수정된 이름입니다.");
    }

    @Test
    @DisplayName("포스트 등록")
    void postSave () throws Exception{
        //given
        PostForm postForm = PostForm.builder()
                .host(host)
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

}