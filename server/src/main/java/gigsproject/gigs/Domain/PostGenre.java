package gigsproject.gigs.Domain;

import lombok.*;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class PostGenre {
    @Id @GeneratedValue
    private Long id;

    @OneToOne(fetch = FetchType.LAZY) @JoinColumn(name = "genreId")
    private Genre genre;

    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "postId")
    private Post post;
}
