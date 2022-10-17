package gigsproject.gigs.Domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
public class PostGenre {
    @Id @GeneratedValue
    private Long id;

    @OneToOne @JoinColumn(name = "id")
    private Genre genre;

    @ManyToOne @JoinColumn(name = "id")
    private Post post;
}
