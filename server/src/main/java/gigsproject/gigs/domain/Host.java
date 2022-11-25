package gigsproject.gigs.domain;

import gigsproject.gigs.request.PostForm;
import gigsproject.gigs.request.StageForm;
import lombok.*;

import javax.persistence.*;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import static java.util.Objects.isNull;
import static javax.persistence.CascadeType.ALL;

@Builder
@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Host extends BaseTimeEntity{
    @Id
    @GeneratedValue
    private Long hostId;

    @OneToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JoinColumn(name = "userId")
    private User user;

    @OneToMany(mappedBy = "host") @Builder.Default
    private final List<Post> posts = new ArrayList<>();


    private String stageName;

    @Lob
    private String stageInfo;

    private LocalTime openTime;
    private LocalTime closeTime;

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


    @OneToMany(mappedBy = "host", cascade = ALL) @Builder.Default
    private final List<StageImg> imgs = new ArrayList<>();

    @OneToMany(mappedBy = "host")
    @Builder.Default
    private List<Review> reviews = new ArrayList<>();

    public Host edit(StageForm stageForm) {
        stageName = stageForm.getName();
        stageInfo = stageForm.getIntroduce();
        openTime = stageForm.getOpenTime();
        closeTime = stageForm.getCloseTime();
        stageType = stageForm.getStageType();
        pay = stageForm.getPay();
        stageAddress = stageForm.getStageAddress();
        targetGender = stageForm.getTargetGender();
        targetAge = stageForm.getTargetAge();
        targetNumber = stageForm.getTargetMinCount();
        stageSize = stageForm.getStageSize();
        return this;
    }


    public Post createPost(PostForm postForm) {

        //시간 제약 조건 수행
        if (this.openTime != null) {
            if (postForm.getStartTime().isBefore(this.openTime)) {
                throw new IllegalArgumentException("무대 오픈 시간보다 빠를 수 없습니다.");
            }
        }
        if (this.closeTime != null) {
            if (postForm.getEndTime().isAfter(this.closeTime)) {
                throw new IllegalArgumentException("무대 클로즈 시간보다 빠를 수 없습니다.");

            }
        }
        Genre genre = postForm.getGenre();
        PostGenre postGenre = PostGenre.builder()
                .genre(genre)
                .build();

        Post post = Post.builder()
                .host(this)
                .date(postForm.getDate())
                .startTime(postForm.getStartTime())
                .endTime(postForm.getEndTime())
                .build();

        post.setPostGenres(postGenre);
        return post;
    }
}
