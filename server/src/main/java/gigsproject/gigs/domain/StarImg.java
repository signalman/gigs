package gigsproject.gigs.domain;

import lombok.*;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class StarImg {
    @Id
    @GeneratedValue
    private Long starImgId;
    private String url;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "starId")
    private Star star;

    public void setStar(Star star) {
        this.star = star;
        star.getStarImgs().add(this);
    }
}
