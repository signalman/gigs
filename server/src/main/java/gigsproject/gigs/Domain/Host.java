package gigsproject.gigs.Domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
@Setter
@Entity
public class Host {
    @Id @GeneratedValue
    private Long id;

    @OneToOne(fetch = FetchType.LAZY) @JoinColumn(name = "userId")
    private User user;

    private String stageName;
    private String stageInfo;
    private Integer stageCount;

    @Temporal(TemporalType.TIME)
    private LocalTime openTime;

    @Temporal(TemporalType.TIME)
    private LocalTime closeTime;

    @OneToOne(fetch = FetchType.LAZY) @JoinColumn(name = "stageTypeId")
    private StageType stageType;

    private Integer targetAge;
    private Integer targetNumber;
    private Integer pay;

    @Embedded
    private Address stageAddress;

    private Boolean targetGender;
    private Integer stageSize;
}
