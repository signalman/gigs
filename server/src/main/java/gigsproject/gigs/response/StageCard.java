package gigsproject.gigs.response;

import gigsproject.gigs.domain.*;
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
        this.imgUrl = host.getImgs().isEmpty() ? "empty" : host.getImgs().get(0).getUrl();
        this.stageSize = host.getStageSize();
        this.name = host.getStageName();
        this.address = host.getStageAddress();
        this.targetGender = String.valueOf(host.getTargetGender());
        this.targetAge = host.getTargetAge();
        this.targetMinCount = host.getTargetNumber();

        this.openTime = isNull(host.getOpenTime()) ? null : LocalTime.from(host.getOpenTime());
        this.closeTime = isNull(host.getCloseTime()) ? null : LocalTime.from(host.getCloseTime());

        this.pay = host.getPay();
        this.stageType = host.getStageType();

//        this.genres = host.getPosts().
//        this.genres = post.getPostGenres().stream()
//                .map(postGenre -> new PostGenreDto(postGenre))
//                .collect(Collectors.toList());

        this.showCount = isNull(host.getShowCount()) ? 0 : host.getShowCount();
        this.reviewCount = isNull(host.getReviewCount()) ? 0 : host.getReviewCount();
        this.score = isNull(host.getAvgScore()) ? 0 : host.getAvgScore();

    }
}
