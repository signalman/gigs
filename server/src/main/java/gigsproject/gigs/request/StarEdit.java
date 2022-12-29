package gigsproject.gigs.request;

import gigsproject.gigs.domain.Gender;
import gigsproject.gigs.domain.Genre;
import gigsproject.gigs.domain.StageType;
import lombok.Data;

import java.util.List;

@Data
public class StarEdit {
    private Gender gender; //
    private List<Genre> genres; //
    private String introduce; //
    private Integer memberNumber; //
    private String name; //
    private Integer reviewCount;
    private Double score;
    private Integer showCount;
    private List<StageType> stageTypes; //
    private Long starId;
    private Long userId;
}
