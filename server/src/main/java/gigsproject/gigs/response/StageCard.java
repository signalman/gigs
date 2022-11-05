package gigsproject.gigs.response;

import gigsproject.gigs.domain.*;
import lombok.Data;

import java.time.LocalDate;
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
    private Address address;

    private Double stageSize;
    private String targetGender;
    private Integer targetAge;

    private LocalDate startDate;
    private LocalDate endDate;
    private LocalTime startTime;
    private LocalTime endTime;

    private Integer targetMinCount;

    private Integer pay;
    private StageType stageType;
    private List<PostGenreDto> genres;

    private Double avgScore;
    private Integer showCount;
    private Integer reviewCount;


    public StageCard(Post post) {
        this.postId = post.getPostId();
        this.hostId = post.getHost().getHostId();
        this.imgUrl = post.getHost().getImgs().isEmpty() ? "" : post.getHost().getImgs().get(0).getUrl();
        this.stageName = post.getHost().getStageName();
        this.address = post.getHost().getStageAddress();
        this.stageSize = post.getHost().getStageSize();
        this.targetGender = String.valueOf(post.getHost().getTargetGender());
        this.targetAge = post.getHost().getTargetAge();
        this.targetMinCount = post.getHost().getTargetNumber();

        this.startDate = isNull(post.getStartDate()) ? null : LocalDate.from(post.getStartDate());
        this.endDate = isNull(post.getEndDate()) ? null : LocalDate.from(post.getEndDate());
        this.startTime = isNull(post.getStartTime()) ? null : LocalTime.from(post.getStartTime());
        this.endTime = isNull(post.getEndTime()) ? null : LocalTime.from(post.getEndTime());

        this.pay  = post.getHost().getPay();
        this.stageType = post.getHost().getStageType();

        this.genres = post.getPostGenres().stream()
                .map(postGenre -> new PostGenreDto(postGenre))
                .collect(Collectors.toList());

        this.showCount = isNull(post.getHost().getShowCount()) ? 0 : post.getHost().getShowCount();
        this.reviewCount = isNull(post.getHost().getReviewCount()) ? 0 : post.getHost().getReviewCount();
        this.avgScore = isNull(post.getHost().getAvgScore()) ? 0 : post.getHost().getAvgScore();
    }
}
