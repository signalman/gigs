package gigsproject.gigs.Domain;

import lombok.*;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class StarGenre {
    @Id @GeneratedValue
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "starId")
    private Star star;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "genreId")
    private Genre genre;
}
