package gigsproject.gigs.controller;

import gigsproject.gigs.request.PostSave;
import gigsproject.gigs.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;

//    @PostMapping("/posts")
//    public void PostSave(@RequestBody PostSave postSave, Authentication authentication){
//            OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
//
//    }

}
