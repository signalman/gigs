package gigsproject.gigs.response;

import gigsproject.gigs.domain.Address;
import gigsproject.gigs.domain.Host;
import gigsproject.gigs.domain.StageType;
import lombok.Getter;

import java.time.LocalTime;

import static java.util.Objects.isNull;

@Getter
public class StageCard {

    private Long hostId;
    private String imgUrl;
    private String name;
    private Address address;

    private Double stageSize;
    private String targetGender;
    private Integer targetAge;

    private LocalTime openTime;
    private LocalTime closeTime;

    private Integer targetMinCount;

    private Integer pay;
    private StageType stageType;
//    private List<PostGenreDto> genres;

    private Double score;
    private Integer showCount;
    private Integer reviewCount;

    public StageCard(Host host) {
        this.hostId = host.getHostId();
        this.imgUrl = isNull(host.getRepImg()) || host.getImgs().isEmpty() ? "" : host.getRepImg();
        this.stageSize = host.getStageSize();
        this.name = host.getStageName();
        this.address = host.getStageAddress();
        this.targetGender = String.valueOf(host.getTargetGender());
        this.targetAge = host.getTargetAge();
        this.targetMinCount = host.getTargetNumber();

        this.pay = host.getPay();
        this.stageType = host.getStageType();

        this.showCount = isNull(host.getShowCount()) ? 0 : host.getShowCount();
        this.reviewCount = Long.valueOf(host.getUser().getReviews().size()).intValue();

        this.score = isNull(host.getAvgScore()) ? 0 : host.getAvgScore();

    }
}
