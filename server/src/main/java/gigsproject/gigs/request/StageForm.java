package gigsproject.gigs.request;

import gigsproject.gigs.domain.Address;
import gigsproject.gigs.domain.Gender;
import gigsproject.gigs.domain.StageImg;
import gigsproject.gigs.domain.StageType;
import lombok.Data;

import java.time.LocalTime;
import java.util.List;

@Data
public class StageForm {


    private String stageName;
    private String stageInfo;

    private LocalTime openTime;
    private LocalTime closeTime;

    private StageType stageType;

    private Double stageSize;
    private Integer pay;

    private Address stageAddress;

    private Gender targetGender;
    private Integer targetAge;
    private Integer targetNumber;

    private Integer showCount;
    private Integer reviewCount;
    private Double avgScore;


    private List<StageImg> imgs;
}
