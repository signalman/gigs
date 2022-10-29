package gigsproject.gigs.response;

import gigsproject.gigs.domain.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

import static java.util.Objects.isNull;

@Data
public class StageCard {
    private Long postId;
    private Long hostId;
    private String imgUrl;
    private String stageName;
    private Address stageAddress;

    private Double stageSize;
    private String targetGender;
    private Integer targetAge;

    private LocalTime startTime;
    private LocalTime endTime;
    private Integer targetMinCount;
    private Integer showCount;

    private Integer pay;
    private StageType stageType;
    private List<HostGenreDto> genres;

    private Float avgScore;
    private Integer reviewCount;


    public StageCard(Post post) {
        this.postId = post.getId();
        this.hostId = post.getHost().getHostId();
//        this.imgUrl = post.getHost().getImgs().get(0).getUrl();
        this.stageName = post.getHost().getStageName();
        this.stageAddress = post.getHost().getStageAddress();
        this.stageSize = post.getHost().getStageSize();
        this.targetGender = String.valueOf(post.getHost().getTargetGender());
        this.targetAge = post.getHost().getTargetAge();
        this.targetMinCount = post.getHost().getTargetNumber();
        this.startTime = isNull(post.getShowStartTime()) ? null : LocalTime.from(post.getShowStartTime());
        this.endTime = isNull(post.getShowEndTime()) ? null : LocalTime.from(post.getShowEndTime());

        this.showCount = post.getHost().getStageCount();
        this.pay  = post.getHost().getPay();
        this.stageType = post.getHost().getStageType();

        this.genres = post.getHost().getHostGenres().stream()
                .map(hostGenre -> new HostGenreDto(hostGenre))
                .collect(Collectors.toList());

    }
}
