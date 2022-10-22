package gigsproject.gigs.domain;

import lombok.*;

import javax.persistence.*;
import java.util.Objects;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class StarStageType {
    @Id @GeneratedValue
    private Long starStageTypeId;
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL) @JoinColumn(name = "starId")
    private Star star;
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL) @JoinColumn(name ="stageTypeId")
    private StageType stageType;

    /**
     *
     * 연관관계 편의 메소드 추가.
     */
    public void setStar(Star star) {
        this.star = star;
        star.getStarStageTypes().add(this);
    }
}
