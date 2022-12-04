package gigsproject.gigs.response;

import gigsproject.gigs.domain.StageImg;
import lombok.Data;

@Data
public class StageImgDto {
    private Long stageImgId;
    private String url;

    public StageImgDto(StageImg stageImg) {
        this.stageImgId = stageImg.getStageImgId();
        this.url = stageImg.getUrl();
    }
}
