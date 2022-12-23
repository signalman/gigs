package gigsproject.gigs.response;

import gigsproject.gigs.domain.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ReviewDto {

    private Long reviewId;
    private String starToHostContent;
    private String hostToStarContent;
    private Host host;
    private Star star;
    private LocalDateTime createdAt;
    private Integer score;

    public ReviewDto(Review review) {
        this.reviewId = review.getReviewId();
        this.starToHostContent = review.getStarToHostContent();
        this.hostToStarContent = review.getHostToStarContent();
        this.host = review.getProposal().getPost().getHost();
        this.star = review.getProposal().getStar();
//        this.createdAt = review.getModifiedDate();
        this.score = review.getScore();
    }
}
