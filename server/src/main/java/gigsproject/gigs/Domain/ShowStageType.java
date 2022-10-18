package gigsproject.gigs.Domain;

import lombok.*;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class ShowStageType {
    @Id @GeneratedValue
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "starId")
    private Star star;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name ="stageTypeId")
    private StageType stageType;
}
