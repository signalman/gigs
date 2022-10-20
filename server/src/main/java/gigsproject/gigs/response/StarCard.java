package gigsproject.gigs.response;

import com.querydsl.core.annotations.QueryProjection;
import gigsproject.gigs.domain.*;
import lombok.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Data
public class StarCard {
    private Long starId;        //스타
    private String starImgUrl;   //스타이미지
    private String starName;      //스타
    private String gender;       //스타
    private Integer memberNumber;  //스타
    private Integer showCount;   //스타
    private List<StarGenreDto> starGenres;  //스타장르
    private List<StarStageTypeDto> starStageTypes;  //스타스테이지타입
    private Double avgScore;     //스타
    private Integer reviewCount;  //리뷰
    public StarCard(Star star){
        this.starId = star.getStarId();
        if(!star.getStarImgs().isEmpty()){
            this.starImgUrl = star.getStarImgs().get(0).getUrl();
        }
        else {
            this.starImgUrl = null;
        }
        this.starName = star.getName();
        this.gender = star.getGender();
        this.memberNumber = star.getMemberNumber();
        this.showCount = star.getShowCount();
        this.avgScore = star.getScore();
        this.reviewCount = Long.valueOf(star.getReviews().stream().count()).intValue();
        this.starGenres = star.getStarGenres().stream()
                .map(starGenre -> new StarGenreDto(starGenre))
                .collect(Collectors.toList());
        this.starStageTypes = star.getStarStageTypes().stream()
                .map(starStageType -> new StarStageTypeDto(starStageType))
                .collect(Collectors.toList());
    }
}
