package gigsproject.gigs.Dto;

import gigsproject.gigs.Domain.Genre;
import gigsproject.gigs.Domain.StageType;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class StarCardDto {
    private Long postId;
    private Long starId;
    private String starImgUrl;
    private String starName;
    private String address;
    private String gender;
    private Integer memberNumber;
    private Integer showCount;
    private List<Genre> genres;
    private List<StageType> stageTypes;
    private Float avgScore;
    private Integer reviewCount;
}
