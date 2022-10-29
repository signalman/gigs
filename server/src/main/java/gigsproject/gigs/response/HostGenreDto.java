package gigsproject.gigs.response;

import gigsproject.gigs.domain.HostGenre;
import lombok.Data;

@Data
public class HostGenreDto {
    private Long hostGenreId;
    private String genreName;

    public HostGenreDto(HostGenre hostGenre) {
        this.hostGenreId = hostGenre.getPostGenreId();
        this.genreName = hostGenre.getGenre().name();
    }
}
