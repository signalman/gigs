package gigsproject.gigs.response;

import gigsproject.gigs.domain.Address;
import gigsproject.gigs.domain.Genre;
import gigsproject.gigs.domain.Post;
import gigsproject.gigs.domain.StageType;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class StageCard {
    private Long postId;
    private Long hostId;
    private String imgUrl;
    private String stageName;
    private Address stageAddress;
    private Float area;
    private String targetGender;
    private Integer targetAge;
    private Integer targetMinCount;
    private LocalTime startTime;
    private LocalTime endTime;

    private Integer showCount;
    private Integer pay;
    private StageType stageType;

    private List<Genre> genres = new ArrayList<>();
    private Float avgScore;
    private Integer reviewCount;


    public StageCard(Post post) {
        this.postId = post.getId();
        this.hostId = post.getHost().getHostId();
        this.imgUrl = post.getHost().getImgs().get(0).getUrl();
        this.stageName = post.getHost().getStageName();
        this.stageAddress = post.getHost().getStageAddress();
//        this.area = post.getHost().geta
//        this.targetGender = post.getHost().getTargetGender();
        this.targetAge = post.getHost().getTargetAge();
//this.targetMinCount = post.getHost().gettarget
        this.startTime = LocalTime.from(post.getShowStartTime());
        this.endTime = LocalTime.from(post.getShowEndTime());

        this.showCount = post.getHost().getStageCount();
        this.pay  = post.getHost().getPay();
        this.stageType = post.getHost().getStageType();

//        this.genres = post.getHost().get

    }
}
