package gigsproject.gigs.response;

import lombok.Data;

import java.util.List;

@Data
public class HomeRes {
    private List<StarCard> starCards;
    private List<StageCard> stageCards;

    public HomeRes(List<StarCard> starCards, List<StageCard> stageCards) {
        this.starCards = starCards;
        this.stageCards = stageCards;
    }
}
