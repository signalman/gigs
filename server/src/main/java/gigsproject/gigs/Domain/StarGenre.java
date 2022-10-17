package gigsproject.gigs.Domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
public class StarGenre {
    @Id @GeneratedValue
    private Long id;
    @ManyToOne @JoinColumn(name = "id")
    private Star star;
    @ManyToOne @JoinColumn(name = "id")
    private Genre genre;
}
