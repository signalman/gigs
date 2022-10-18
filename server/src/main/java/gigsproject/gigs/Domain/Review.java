package gigsproject.gigs.Domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
public class Review {
    @Id @GeneratedValue
    private Long id;
    private String content;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "hostId")
    private Host host;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "starId")
    private Star star;
    private LocalDateTime createdAt;
    private Integer score;
    private Boolean type;
}
