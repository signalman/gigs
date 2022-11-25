package gigsproject.gigs.controller;

import gigsproject.gigs.config.oauth.OAuth2UserCustom;
import gigsproject.gigs.domain.Role;
import gigsproject.gigs.domain.User;
import gigsproject.gigs.request.PostForm;
import gigsproject.gigs.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;

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
    public String delete(@PathVariable Long postId) {
        postService.delete(postId);
        return "삭제 완료";
    }
}
