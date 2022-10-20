package gigsproject.gigs.domain;

import lombok.*;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class PostGenre {
    @Id @GeneratedValue
    private Long postGenreId;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL ) @JoinColumn(name = "genreId")
    private Genre genre;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL ) @JoinColumn(name = "postId")
    private Post post;
}
