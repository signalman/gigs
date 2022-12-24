package gigsproject.gigs.response;

import gigsproject.gigs.domain.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
//상대방으로부터 어떤 포스트인지는 상관없이 그냥 이 무대에대한 리뷰
public class ReviewDto {

    private Long reviewId;
    private Long userId;
    private String content; // 상대방이 쓴 내용

    private LocalDateTime createdAt;
    private Double score;

    private String role; //star, host

    public ReviewDto(Review review) {
        this.reviewId = review.getReviewId();
        this.userId = review.getUser().getUserId();
        this.content = review.getContent();
        this.createdAt = review.getModifiedDate();
        this.score = review.getScore();
        this.role = review.getUser().getRole().toString().toLowerCase();
    }
}
