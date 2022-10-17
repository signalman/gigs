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
    @ManyToOne @JoinColumn(name = "id")
    private Host host;
    @ManyToOne @JoinColumn(name = "id")
    private Star star;
    private LocalDateTime createdAt;
    private Integer score;
    private Boolean type;
}
