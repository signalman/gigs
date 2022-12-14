package gigsproject.gigs.service;

import gigsproject.gigs.domain.*;
import gigsproject.gigs.request.PostForm;
import gigsproject.gigs.request.ProposalForm;
import org.assertj.core.api.Assertions;
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
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
class ProposalServiceTest {

    @Autowired
    EntityManager em;

    @Autowired
    ProposalService proposalService;
    @Autowired PostService postService;
    private Star star;
    private Post post;
    private Host host;
    private User user;
    private PostForm postForm;

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

        postForm = PostForm.builder()
                .genre(ROCK)
                .date(LocalDate.of(2022, 12, 25))
                .startTime(LocalTime.of(18, 0))
                .endTime(LocalTime.of(20,30 ))
                .build();
        post = Post.createPost(postForm, host);
        em.persist(post);

        star = Star.builder()
                .name("스타")
                .user(user)
                .build();
        em.persist(star);
    }

    @Test
    @DisplayName("제안서 생성 테스트")
    void proposalSave() throws Exception {
        //given
        ProposalForm proposalForm = new ProposalForm(post.getPostId(), star.getStarId(), "제안합니다.");

        //when
        Proposal save = proposalService.save(proposalForm, star, post);

        //then
        Proposal byId = proposalService.findById(save.getProposalId());
        assertThat(byId.getContent()).isEqualTo("제안합니다.");
    }

    @Test
    @DisplayName("제안서 승낙 테스트")
    void proposalAccept() throws Exception {
        //given
        ProposalForm proposalForm = new ProposalForm(post.getPostId(), star.getStarId(), "제안합니다.");
        Proposal save = proposalService.save(proposalForm, star, post);

        //when
        String status = "signed";
        proposalService.changeStatus(save.getProposalId(), status);
        postService.setPostSigned(save.getPost().getPostId());

        //then
        assertThat(save.getShowStatus()).isEqualTo(ShowStatus.SIGNED);
        assertThat(post.getStatus()).isEqualTo(PostStatus.SIGNED);
    }

}