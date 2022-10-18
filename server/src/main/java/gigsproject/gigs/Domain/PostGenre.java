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

    @OneToOne(fetch = FetchType.LAZY) @JoinColumn(name = "genreId")
    private Genre genre;

    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "postId")
    private Post post;
}
