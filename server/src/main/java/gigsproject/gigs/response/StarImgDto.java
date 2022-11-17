package gigsproject.gigs.response;

import gigsproject.gigs.domain.StarImg;
import lombok.Data;

@Data
public class StarImgDto {
    private Long starImgId;
    private String url;

    public StarImgDto(StarImg starImg) {
        this.starImgId = starImg.getStarImgId();
        this.url = starImg.getUrl();
    }
}
