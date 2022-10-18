package gigsproject.gigs.Domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
public class ShowStageType {
    @Id @GeneratedValue
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "starId")
    private Star star;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name ="stageTypeId")
    private StageType stageType;
}
