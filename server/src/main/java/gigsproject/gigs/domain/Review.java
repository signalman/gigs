package gigsproject.gigs.domain;

import gigsproject.gigs.request.ReviewForm;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Review extends BaseTimeEntity{
    @Id
    @GeneratedValue
    private Long reviewId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user")
    private User user; //리뷰 작성자

    @Lob
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "proposalId")
    private Proposal proposal;
    private Long roleId;

    private Double score;

    public void edit(ReviewForm reviewForm) {
        this.content = reviewForm.getContent();
        this.score = reviewForm.getScore();
    }

    public void setUser(User user) {
        this.user = user;
        user.getReviews().add(this);
    }
}
