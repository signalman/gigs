package gigsproject.gigs.response;

import gigsproject.gigs.domain.PostGenre;
import lombok.Data;

@Data
public class PostGenreDto {
    private Long postGenreId;
    private String genreName;

    public PostGenreDto(PostGenre postGenre) {
        this.postGenreId = postGenre.getPostGenreId();
        this.genreName = postGenre.getGenre().name();
    }
}
