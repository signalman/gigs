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
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "starId")
    private Star star;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "genreId")
    private Genre genre;
}
