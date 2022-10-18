package gigsproject.gigs.Domain;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
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
