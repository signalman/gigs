package gigsproject.gigs.controller;

import gigsproject.gigs.config.oauth.OAuth2UserCustom;
import gigsproject.gigs.domain.Role;
import gigsproject.gigs.domain.User;
import gigsproject.gigs.request.ReviewForm;
import gigsproject.gigs.response.ReviewDto;
import gigsproject.gigs.service.ReviewService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    /**
     * 특정 리뷰 작성
     */
    @PutMapping("/mypage/review")
    public void update(@RequestBody ReviewForm reviewForm,
                       @AuthenticationPrincipal OAuth2UserCustom oAuth2UserCustom) {
        log.info("******* review 작성 ***********");
        User user = oAuth2UserCustom.getUser();
        reviewService.edit(user, reviewForm);
    }

    /**
     * // top 리뷰 선정 방법
     * // 0. content 가 '' 이 아닌 리뷰 중에서
     * // 1. score 순으로 정렬
     * // 2. score 가 같은 리뷰는 최신순으로 정렬
     * // 3. 상위 20개만
     * // *** 호스트 스타 가리지 말고 걍 합쳐서
     */
    @GetMapping("/reviews")
    public Page<ReviewDto> getListByTopScores(@PageableDefault(size = 20) Pageable pageable) {
        return reviewService.getReviewsByScoreDesc(pageable);
    }
//    /**
//     * 특정 리뷰 요청
//     */
//    @GetMapping("/review/{reviewId}")
//    public void getReview(@PathVariable Long reviewId) {
//        reviewService.getReview(reviewId);

//    }


}
