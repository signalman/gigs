package gigsproject.gigs.Domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
public class Post {
    @Id @GeneratedValue
    private Long id;

    @ManyToOne @JoinColumn(name = "id")
    private Host host;

    @Temporal(TemporalType.TIME)
    private String showStartTime;

    @Temporal(TemporalType.TIME)
    private String showEndTime;

}
