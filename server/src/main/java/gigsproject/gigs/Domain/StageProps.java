package gigsproject.gigs.Domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter @Setter
@Entity
public class StageProps {
    @Id @GeneratedValue
    private Long id;

    @ManyToOne @JoinColumn(name = "id")
    private Host host;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Props props;
}
