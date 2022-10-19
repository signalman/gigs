package gigsproject.gigs.response;

import com.querydsl.core.annotations.QueryProjection;
import gigsproject.gigs.domain.Genre;
import gigsproject.gigs.domain.StageType;
import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StarCard {
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
