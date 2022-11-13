package gigsproject.gigs.response;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonProperty;
import gigsproject.gigs.domain.*;
import lombok.Data;
import lombok.Getter;

import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

import static java.util.Objects.isNull;

@Data
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class HostResponse {

    private final Long hostId;
    private List<StageImg> imgUrl;
    private String stageName;
    private final Address address;
    private StageType stageType;
    private String stageInfo;

    private Double stageSize;
    private String targetGender;
    private Integer targetAge;

    private LocalTime openTime;
    private LocalTime closeTime;

    private Integer targetMinCount;

    private Integer pay;
    private Double avgScore;
    private Integer showCount;
    private Integer reviewCount;

    private List<PostResponse> posts;

//    private List<PostGenreDto> genres;


    public HostResponse(Host host) {
        this.hostId = host.getHostId();
        this.stageName = host.getStageName();
        this.stageInfo = host.getStageInfo();
        this.imgUrl = host.getImgs().isEmpty() ? List.of() : host.getImgs();
        this.stageSize = host.getStageSize();
        this.address = host.getStageAddress();
        this.targetGender = String.valueOf(host.getTargetGender());
        this.targetAge = host.getTargetAge();
        this.targetMinCount = host.getTargetNumber();

        this.openTime = isNull(host.getOpenTime()) ? null : LocalTime.from(host.getOpenTime());
        this.closeTime = isNull(host.getCloseTime()) ? null : LocalTime.from(host.getCloseTime());

        this.pay = host.getPay();
        this.stageType = host.getStageType();

        this.showCount = isNull(host.getShowCount()) ? 0 : host.getShowCount();
        this.reviewCount = isNull(host.getReviewCount()) ? 0 : host.getReviewCount();

        this.avgScore = isNull(host.getAvgScore()) ? 0 : host.getAvgScore();

        this.posts = isNull(host.getPosts()) ? List.of() : host.getPosts().stream()
                .map(post -> new PostResponse(post))
                .collect(Collectors.toList());

    }
}
