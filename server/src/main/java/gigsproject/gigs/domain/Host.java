package gigsproject.gigs.domain;

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

    private Integer stageCount;
    private Double avgScore;

    @OneToMany(mappedBy = "host") @Builder.Default
    private final List<Post> posts = new ArrayList<>();

    @OneToMany(mappedBy = "host", cascade = ALL) @Builder.Default
    private final List<StageImg> imgs = new ArrayList<>();


}
