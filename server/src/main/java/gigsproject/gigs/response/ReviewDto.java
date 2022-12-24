package gigsproject.gigs.response;

import gigsproject.gigs.domain.Review;
import gigsproject.gigs.domain.Role;
import lombok.Data;

import java.time.LocalDateTime;

@Data
//상대방으로부터 어떤 포스트인지는 상관없이 그냥 이 무대에대한 리뷰
public class ReviewDto {

    private Long reviewId;
    private Long userId;
    private Long roleId; //리뷰작성자의 호스트 or 스타 id
    private String role; //star, host

    private String content; // 상대방이 쓴 내용
    private Double score;

    private LocalDateTime createdAt;


    public ReviewDto(Review review) {
        this.reviewId = review.getReviewId();
        this.userId = review.getUser().getUserId();
        this.content = review.getContent();
        this.createdAt = review.getModifiedDate();
        this.score = review.getScore();
        this.role = review.getUser().getRole().toString().toLowerCase(); //리뷰 작성자의 역할

        if (role == Role.ROLE_HOST.name().toLowerCase()) {
            this.roleId = review.getProposal().getPost().getHost().getHostId();
        } else {
            this.roleId = review.getProposal().getStar().getStarId();
        }
    }
}
