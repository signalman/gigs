package gigsproject.gigs.request;

import gigsproject.gigs.domain.Gender;
import gigsproject.gigs.domain.Genre;
import gigsproject.gigs.domain.StageType;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class StageSearch {

    private String name;

    private List<StageType> stageTypes;
    private List<Genre> genres;

    private String address;

    private String startDate;
    private String endDate;
    private String startTime;
    private String endTime;

    private Gender targetGender;

    private Integer targetAge;

    private Integer targetMinCount;
}
