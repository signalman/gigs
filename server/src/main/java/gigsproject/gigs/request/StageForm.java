package gigsproject.gigs.request;

import gigsproject.gigs.domain.Address;
import gigsproject.gigs.domain.Gender;
import gigsproject.gigs.domain.StageImg;
import gigsproject.gigs.domain.StageType;
import lombok.*;

import java.time.LocalTime;
import java.util.List;
import java.util.Map;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StageForm {

    private Long hostId;
    private String name;
    private String introduce;

    private LocalTime openTime;
    private LocalTime closeTime;

    private StageType stageType;

    private Double stageSize;
    private Integer pay;

    private Gender targetGender;
    private Integer targetAge;
    private Integer targetMinCount;

    private Integer showCount;
    private Integer reviewCount;
    private Double avgScore;

    private List<StageImg> imgs;

    private Map<String, String> address;
}
