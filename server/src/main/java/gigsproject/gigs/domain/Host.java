package gigsproject.gigs.domain;

import lombok.*;

import javax.persistence.*;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import static javax.persistence.CascadeType.*;

@Builder
@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Host {
    @Id
    @GeneratedValue
    private Long hostId;

    @OneToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JoinColumn(name = "userId")
    private User user;

    private String stageName;

    @Lob
    private String stageInfo;

    private Integer stageCount;

    private LocalTime openTime;
    private LocalTime closeTime;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "stageTypeId")
    private StageType stageType;


    private Double stageSize;
    private Integer pay;

    @Embedded
    private Address stageAddress;

    private Integer targetGender;
    private Integer targetAge;
    private Integer targetNumber;


    private Double score;

    @OneToMany(mappedBy = "host")
    private final List<Post> posts = new ArrayList<>();

    @OneToMany(mappedBy = "host", cascade = ALL)
    private final List<StageImg> imgs = new ArrayList<>();

    @OneToMany(mappedBy = "host", cascade = ALL)
    private final List<HostGenre> hostGenres = new ArrayList<>();

}
