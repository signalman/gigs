package gigsproject.gigs.Domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
public class Host {
    @Id @GeneratedValue
    private Long id;

    @OneToOne @JoinColumn(name = "id")
    private User user;

    private String stageName;
    private String stageInfo;
    private Integer stageCount;
    private String openTime;
    private String closeTime;

    @OneToOne @JoinColumn(name = "id")
    private StageType stageType;

    private Integer targetAge;
    private Integer targetNumber;
    private Integer pay;

    @Embedded
    private Address stageAddressId;

    private Boolean targetGender;
    private Integer stageSize;
}
