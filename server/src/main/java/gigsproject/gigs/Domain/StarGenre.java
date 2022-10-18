package gigsproject.gigs.Domain;

import lombok.*;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class StarGenre {
    @Id
    @GeneratedValue
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "starId")
    private Star star;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "genreId")
    private Genre genre;

    public StarGenre(Star star, Genre genre) {
        this.star = star;
        this.genre = genre;
    }
    public StarGenre(Star star){
        this(star, null);
    }
}
