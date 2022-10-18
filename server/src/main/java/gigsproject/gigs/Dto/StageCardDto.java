package gigsproject.gigs.Dto;

import gigsproject.gigs.Domain.Genre;
import gigsproject.gigs.Domain.StageType;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class StageCardDto {
    private Long postId;
    private Long hostId;
    private String imgUrl;
    private String stageName;
    private String stageAddress;
    private Float area;
    private String targetGender;
    private Integer targetAge;
    private Integer targetMinCount;
    private LocalTime startTime;
    private LocalTime endTime;

    private Integer showCount;
    private Integer pay;
    private String stageType;

    private List<Genre> genres;
    private Float avgScore;
    private Integer reviewCount;
}
