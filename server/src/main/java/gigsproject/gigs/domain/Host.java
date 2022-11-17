package gigsproject.gigs.domain;

import gigsproject.gigs.request.PostSave;
import lombok.*;

import javax.persistence.*;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

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


    public Post createPost(PostSave postSave) {

        //시간 제약 조건 수행
        if (postSave.getStartTime().isBefore(this.openTime)) {
            throw new IllegalArgumentException("무대 오픈 시간보다 빠를 수 없습니다.");
        }
        if (postSave.getEndTime().isAfter(this.closeTime)) {
            throw new IllegalArgumentException("무대 클로즈 시간보다 빠를 수 없습니다.");

        }


        Post post = Post.builder()
                .host(this)
//                .postGenres()
                .date(postSave.getDate())
                .startTime(postSave.getStartTime())
                .endTime(postSave.getEndTime())
                .build();
        return post;
    }
}
