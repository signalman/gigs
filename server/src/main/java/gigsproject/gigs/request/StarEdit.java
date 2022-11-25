package gigsproject.gigs.request;

import gigsproject.gigs.domain.Gender;
import gigsproject.gigs.domain.StarGenre;
import gigsproject.gigs.domain.StarStageType;
import lombok.Data;

import java.util.List;

@Data
public class StarEdit {
    private Gender gender; //
    private List<StarGenre> genres; //
    private String introduce; //
    private Integer memberNumber; //
    private String name; //
    private Integer reviewCount;
    private Double score;
    private Integer showCount;
    private List<StarStageType> stageTypes; //
    private Long starId;
    private Long userId;
}
