package gigsproject.gigs.controller;

import gigsproject.gigs.config.oauth.OAuth2UserCustom;
import gigsproject.gigs.domain.*;
import gigsproject.gigs.request.PostForm;
import gigsproject.gigs.request.ProposalForm;
import gigsproject.gigs.response.PostFormRes;
import gigsproject.gigs.response.ProposalResponse;
import gigsproject.gigs.service.HostService;
import gigsproject.gigs.service.PostService;
import gigsproject.gigs.service.ProposalService;
import gigsproject.gigs.service.StarService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static gigsproject.gigs.domain.PostStatus.SIGNED;

@RestController
@RequiredArgsConstructor
@Slf4j
public class PostController {
    private final PostService postService;
    private final StarService starService;
    private final HostService hostService;
    private final ProposalService proposalService;

    @PostMapping("/posts")
    public void PostSave(@AuthenticationPrincipal OAuth2UserCustom oAuth2UserCustom,
                         @RequestBody PostForm postForm) {
        User user = oAuth2UserCustom.getUser();

        if (user.getRole() != Role.ROLE_HOST) {
            throw new RuntimeException("호스트가 아닙니다.");
        }
        postService.write(user, postForm);

    }

    @DeleteMapping("/posts/{postId}")
    public String delete(@AuthenticationPrincipal OAuth2UserCustom oAuth2UserCustom,
                         @PathVariable Long postId) {
        User user = oAuth2UserCustom.getUser();

        if (user.getRole() != Role.ROLE_HOST) {
            throw new IllegalArgumentException("호스트가 아닙니다.");
        }
        postService.delete(postId);
        return "";
    }

    @GetMapping("/posts")
    public ResponseEntity showPostForm(@AuthenticationPrincipal OAuth2UserCustom oAuth2UserCustom) {
        User user = oAuth2UserCustom.getUser();
        try {
            if (user.getRole() != Role.ROLE_HOST) {
                throw new IllegalArgumentException("포스트 등록은 호스트만 가능합니다.");
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        Host host = hostService.findByUser(user);
        List<Post> posts = host.getPosts();
        PostFormRes postFormRes = new PostFormRes(host, posts);
        return ResponseEntity.ok().body(postFormRes);
    }


    /**
     * 제안서 작성 폼
     */
    @GetMapping("/posts/{postId}")
    public ResponseEntity showProposalForm(@PathVariable Long postId, @AuthenticationPrincipal OAuth2UserCustom oAuth2UserCustom) {
        User user = oAuth2UserCustom.getUser();

        try {
            if (user.getRole() != Role.ROLE_STAR) {
                throw new IllegalArgumentException("스타만 제안서를 작성할 수 있습니다.");
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        Star star = starService.findByUser(user);
        Post post = postService.findById(postId);
        try {
            if (post.getStatus() == SIGNED) {
                throw new IllegalArgumentException("이 포스트는 이미 체결되었습니다.");
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

        ProposalResponse proposalResponse = new ProposalResponse(star.getStarId(), post.getPostId(), star.getRepImg(), star.getName(), post.getHost().getStageName(), post.getDate(), post.getStartTime(), post.getEndTime());
        return ResponseEntity.ok().body(proposalResponse);
    }

    /**
     * =============================아래부터는 제안서 파트 ===================
     */

    // 제안서 생성
    @PostMapping("/posts/{postId}")
    public ResponseEntity createProposal(@PathVariable Long postId, @RequestBody ProposalForm proposalForm, @AuthenticationPrincipal OAuth2UserCustom oAuth2UserCustom) {
        User user = oAuth2UserCustom.getUser();
        try {
            if (user.getRole() != Role.ROLE_STAR) {
                throw new IllegalArgumentException("스타만 제안서를 작성할 수 있습니다.");
            }
        } catch (IllegalArgumentException exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
        Star star = starService.findByUser(user);
        Post post = postService.findById(postId);
        proposalService.save(proposalForm, star, post);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //제안서 삭제
    @DeleteMapping("/proposals/{proposalId}")
    public ResponseEntity deleteProposal(@PathVariable Long proposalId, @AuthenticationPrincipal OAuth2UserCustom oAuth2UserCustom) {

        try {
            proposalService.delete(proposalId);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        return new ResponseEntity(HttpStatus.OK);
    }

    /**
     * 제안서 승낙 / 거절
     */
    @PostMapping("/proposals/{proposalId}")
    public void changeStatus(@PathVariable Long proposalId, @RequestParam String status) {
        log.info("controller -> proposal id : {} , proposal status : {} *******", proposalId, status);
        ShowStatus changedStatus = proposalService.changeStatus(proposalId, status);

        Proposal proposal = proposalService.findById(proposalId);
        postService.setPostStatus(proposal.getPost().getPostId(), changedStatus);

    }
}
