package gigsproject.gigs.request;

import gigsproject.gigs.domain.Genre;
import gigsproject.gigs.domain.StageType;
import lombok.Data;

import java.util.List;

@Data
public class StarSearch {
    private String name;
    private List<StageType> stages;
    private List<Genre> genres;
    private String address;
    private String gender;
}
