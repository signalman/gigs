package gigsproject.gigs.response;

import gigsproject.gigs.domain.Genre;
import gigsproject.gigs.domain.StageType;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class StarCard {
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
