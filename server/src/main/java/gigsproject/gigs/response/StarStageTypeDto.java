package gigsproject.gigs.response;

import gigsproject.gigs.domain.StageType;
import gigsproject.gigs.domain.Star;
import gigsproject.gigs.domain.StarStageType;
import lombok.Data;

@Data
public class StarStageTypeDto {
    private Long starStageTypeId;
    private String stageTypeName;

    public StarStageTypeDto(StarStageType starStageType){
        this.starStageTypeId = starStageType.getStarStageTypeId();
        this.stageTypeName = starStageType.getStageType().getName();
    }
}
