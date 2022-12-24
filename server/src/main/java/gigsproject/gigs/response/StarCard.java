package gigsproject.gigs.response;

import gigsproject.gigs.domain.Star;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

import static java.util.Objects.isNull;

@Data
public class StarCard {
    private Long starId;        //스타
    private String starImgUrl;   //스타이미지
    private String starName;      //스타
    private String gender;       //스타
    private Integer memberNumber;  //스타
    private Integer showCount;   //스타
    private List<StarGenreDto> genres;  //스타장르
    private List<StarStageTypeDto> starStageTypes;  //스타스테이지타입
    private Double avgScore;     //스타
    private Integer reviewCount;  //리뷰

    public StarCard(Star star) {
        this.starId = star.getStarId();
        this.starImgUrl = isNull(star.getRepImg()) ? "" : star.getRepImg();
        this.starName = star.getName();
        this.gender = star.getGender().name();
        this.memberNumber = star.getMemberNumber();
        this.showCount = isNull(star.getShowCount()) ? 0 : star.getShowCount();
        this.avgScore = isNull(star.getScore()) ? 0 : star.getScore();
        this.reviewCount = Long.valueOf(star.getUser().getReviews().size()).intValue();
        this.genres = star.getStarGenres().stream()
                .map(starGenre -> new StarGenreDto(starGenre))
                .collect(Collectors.toList());
        this.starStageTypes = star.getStarStageTypes().stream()
                .map(starStageType -> new StarStageTypeDto(starStageType))
                .collect(Collectors.toList());
    }
}
