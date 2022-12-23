package gigsproject.gigs.controller;

import gigsproject.gigs.config.oauth.OAuth2UserCustom;
import gigsproject.gigs.domain.Role;
import gigsproject.gigs.domain.User;
import gigsproject.gigs.request.ReviewForm;
import gigsproject.gigs.service.ReviewService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController("/mypage")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;


    /**
     * 특정 리뷰 요청
     */
    @GetMapping("/review/{reviewId}")
    public void getReview(@PathVariable Long reviewId) {
//        reviewService.getReview(reviewId);
    }

    /**
     * 특정 리뷰 수정
     */
    @PutMapping("/review")
    public void update(@RequestBody ReviewForm reviewForm,
                       @AuthenticationPrincipal OAuth2UserCustom oAuth2UserCustom) {
        User user = oAuth2UserCustom.getUser();
        Role role = user.getRole();
        Long proposalId = reviewForm.getProposalId();

        reviewService.edit(reviewForm, proposalId, role);
    }


}
