package gigsproject.gigs.domain;

import gigsproject.gigs.request.PostForm;
import gigsproject.gigs.request.StageForm;
import lombok.*;

import javax.persistence.*;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import static gigsproject.gigs.domain.PostStatus.UNSIGNED;
import static javax.persistence.CascadeType.ALL;

@Builder
@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Host extends BaseTimeEntity {
    @Id
    @GeneratedValue
    private Long hostId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private User user;

    @OneToMany(mappedBy = "host", cascade = CascadeType.ALL)
    @Builder.Default
    private final List<Post> posts = new ArrayList<>();


    private String stageName;

    @Lob
    private String stageInfo;

    @Enumerated(EnumType.STRING)
    private StageType stageType;

    private Double stageSize;
    private Integer pay;

    @Embedded
    private Address stageAddress;

    @Enumerated(EnumType.STRING)
    private Gender targetGender;
    private Integer targetAge;
    private Integer targetNumber;

    private Integer showCount;
    private Integer reviewCount;
    private Double avgScore;

    private String repImg;

    @OneToMany(mappedBy = "host", cascade = ALL)
    @Builder.Default
    private final List<StageImg> imgs = new ArrayList<>();

    @OneToMany(mappedBy = "host", cascade = ALL)
    @Builder.Default
    private List<Review> reviews = new ArrayList<>();

    public Host edit(StageForm stageForm) {
        stageName = stageForm.getName();
        stageInfo = stageForm.getIntroduce();
        stageType = stageForm.getStageType();
        pay = stageForm.getPay();
        stageAddress = stageForm.getStageAddress();
        targetGender = stageForm.getTargetGender();
        targetAge = stageForm.getTargetAge();
        targetNumber = stageForm.getTargetMinCount();
        stageSize = stageForm.getStageSize();
        return this;
    }

    public void setRepImg(String repImg) {
        this.repImg = repImg;
    }
}
