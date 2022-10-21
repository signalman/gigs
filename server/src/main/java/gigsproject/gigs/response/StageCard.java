package gigsproject.gigs.response;

import gigsproject.gigs.domain.Genre;
import gigsproject.gigs.domain.Post;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class StageCard {
    private Long postId;
    private Long hostId;
    private String imgUrl;
    private String stageName;
    private String stageAddress;
    private Float area;
    private String targetGender;
    private Integer targetAge;
    private Integer targetMinCount;
    private LocalTime startTime;
    private LocalTime endTime;

    private Integer showCount;
    private Integer pay;
    private String stageType;

    private List<Genre> genres;
    private Float avgScore;
    private Integer reviewCount;


    public StageCard(Post post) {
        this.postId = post.getId();
        this.hostId = post.getHost().getId();
        this.startTime = LocalTime.from(post.getShowStartTime());
        this.endTime = LocalTime.from(post.getShowEndTime());
    }
}
