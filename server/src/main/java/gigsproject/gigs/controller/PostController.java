package gigsproject.gigs.controller;

import gigsproject.gigs.config.oauth.OAuth2UserCustom;
import gigsproject.gigs.domain.Post;
import gigsproject.gigs.domain.Role;
import gigsproject.gigs.domain.Star;
import gigsproject.gigs.domain.User;
import gigsproject.gigs.request.PostForm;
import gigsproject.gigs.request.ProposalForm;
import gigsproject.gigs.response.ProposalResponse;
import gigsproject.gigs.service.PostService;
import gigsproject.gigs.service.ProposalService;
import gigsproject.gigs.service.StarService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
public class PostController {
    private final PostService postService;
    private final StarService starService;
    private final ProposalService proposalService;

    @PostMapping("/posts")
    public void PostSave(@AuthenticationPrincipal OAuth2UserCustom oAuth2UserCustom,
                         @RequestBody PostForm postForm) {
        User user = oAuth2UserCustom.getUser();

        if (user.getRole() != Role.ROLE_HOST) {
            throw new IllegalArgumentException("호스트가 아닙니다.");
        }
        postService.write(user, postForm);
    }

//    @PatchMapping("/posts/{postId}")
//    public void edit(@PathVariable Long postId, @RequestBody @Valid PostEdit postEdit) {
//        postService.edit(postId, postEdit);
//    }

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
        ProposalResponse proposalResponse = new ProposalResponse(star.getStarId(), post.getPostId(), star.getName(), post.getHost().getStageName(), post.getDate(), post.getStartTime(), post.getEndTime());
        return ResponseEntity.ok().body(proposalResponse);
    }

    /**
     * 제안서 작성
     */
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


}
