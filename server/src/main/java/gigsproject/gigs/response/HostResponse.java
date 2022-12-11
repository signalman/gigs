package gigsproject.gigs.response;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import gigsproject.gigs.domain.*;
import lombok.Data;

import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

import static java.util.Objects.isNull;

@Data
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class HostResponse {

    private Long userId; //수정 권한을 위해

    private final Long hostId;
    private List<StageImgDto> stageImgs;
    private String repImg;

    private String name;
    private final Address address;
    private StageType stageType;
    private String introduce;

    private Double stageSize;
    private String targetGender;
    private Integer targetAge;

    private LocalTime openTime;
    private LocalTime closeTime;

    private Integer targetMinCount;

    private Integer pay;
    private Double score;
    private Integer showCount;
    private List<Review> reviews;

    private List<PostResponse> posts;

    public HostResponse(Host host) {
        this.userId = host.getUser().getUserId();
        this.hostId = host.getHostId();
        this.name = host.getStageName();
        this.introduce = host.getStageInfo();
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
        this.reviews = isNull(host.getReviews()) ? List.of() : host.getReviews();

        this.score = isNull(host.getAvgScore()) ? 0 : host.getAvgScore();

        this.posts = isNull(host.getPosts()) ? List.of() : host.getPosts().stream()
                .filter(p -> p.getStatus().equals(PostStatus.UNSIGNED))
                .map(post -> new PostResponse(post))
                .collect(Collectors.toList());

        this.repImg = host.getRepImg();
        this.stageImgs = host.getImgs().stream()
                .map(i -> new StageImgDto(i)).collect(Collectors.toList());

    }
}
