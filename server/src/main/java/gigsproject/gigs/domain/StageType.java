package gigsproject.gigs.domain;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Setter
@Getter
@Entity
@NoArgsConstructor
public class StageType {
    @Id @GeneratedValue
    private Long stageTypeId;

    private String name;
}
