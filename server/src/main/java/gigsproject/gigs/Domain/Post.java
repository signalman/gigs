package gigsproject.gigs.Domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
public class Post {
    @Id @GeneratedValue
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "hostId")
    private Host host;

    @Temporal(TemporalType.TIME)
    private LocalDateTime showStartTime;

    @Temporal(TemporalType.TIME)
    private LocalDateTime showEndTime;

}
