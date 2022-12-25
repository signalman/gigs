package gigsproject.gigs.response;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import gigsproject.gigs.domain.Address;
import gigsproject.gigs.domain.Host;
import gigsproject.gigs.domain.Review;
import gigsproject.gigs.domain.StageType;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

import static gigsproject.gigs.domain.PostStatus.UNSIGNED;
import static java.util.Objects.isNull;

/**
 * 무대 상세정보
 */
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
    private List<ReviewDto> reviews;


    private List<PostResponse> posts;

    public HostResponse(Host host, List<ReviewDto> reviews) {
        this.userId = host.getUser().getUserId();
        this.hostId = host.getHostId();
        this.name = host.getStageName();
        this.introduce = host.getStageInfo();
        this.stageSize = host.getStageSize();
        this.address = host.getStageAddress();
        this.targetGender = String.valueOf(host.getTargetGender());
        this.targetAge = host.getTargetAge();
        this.targetMinCount = host.getTargetNumber();

        this.pay = host.getPay();
        this.stageType = host.getStageType();

        this.showCount = isNull(host.getShowCount()) ? 0 : host.getShowCount();
//        this.reviews = host.getUser().getReviews()
//                .stream()
//                .map(r -> new ReviewDto(r))
//                .collect(Collectors.toList());
        this.reviews = reviews;

        this.score = isNull(host.getAvgScore()) ? 0 : host.getAvgScore();

        this.posts = isNull(host.getPosts()) ? List.of() : host.getPosts().stream()
                .filter(p -> p.getStatus().equals(UNSIGNED))
                .filter(p -> p.getDate().isEqual(LocalDate.now()) || p.getDate().isAfter(LocalDate.now()))
                .map(post -> new PostResponse(post))
                .collect(Collectors.toList());

        this.repImg = host.getRepImg();
        this.stageImgs = host.getImgs().stream()
                .map(i -> new StageImgDto(i)).collect(Collectors.toList());

    }
}
