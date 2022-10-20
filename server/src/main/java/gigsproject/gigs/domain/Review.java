package gigsproject.gigs.domain;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Review {
    @Id @GeneratedValue
    private Long reviewId;
    private String content;
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL ) @JoinColumn(name = "hostId")
    private Host host;
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL ) @JoinColumn(name = "starId")
    private Star star;
    private LocalDateTime createdAt;
    private Integer score;
    private Boolean type;

    public void setStar(Star star) {
        this.star = star;
        star.getReviews().add(this);
    }


}
