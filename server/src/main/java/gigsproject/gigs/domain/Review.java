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
public class Review {
    @Id
    @GeneratedValue
    private Long reviewId;

    @Lob
    private String starToHostContent;

    @Lob
    private String hostToStarContent;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hostId")
    private Host host;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "starId")
    private Star star;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "proposalId")
    private Proposal proposal;

    private Integer score;

    public void editFromHost(ReviewForm reviewForm) {
        this.hostToStarContent = reviewForm.getContent();
        this.score = reviewForm.getScore();
    }

    public void editFromStar(ReviewForm reviewForm) {
        this.starToHostContent = reviewForm.getContent();
        this.score = reviewForm.getScore();

    }

}
