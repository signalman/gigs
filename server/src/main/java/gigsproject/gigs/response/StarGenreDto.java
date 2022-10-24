package gigsproject.gigs.response;

import gigsproject.gigs.domain.Genre;
import gigsproject.gigs.domain.Star;
import gigsproject.gigs.domain.StarGenre;
import lombok.Data;

import javax.persistence.*;

@Data
public class StarGenreDto {
    private Long starGenreId;
    private String genreName;

    public StarGenreDto(StarGenre starGenre) {
        this.starGenreId = starGenre.getStarGenreId();
        this.genreName = starGenre.getGenre().name();
    }
}
