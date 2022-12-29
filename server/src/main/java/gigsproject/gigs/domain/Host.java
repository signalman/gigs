package gigsproject.gigs.domain;

import gigsproject.gigs.request.StageForm;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static java.util.Objects.isNull;
import static javax.persistence.CascadeType.ALL;

@Slf4j
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

//    @OneToMany(mappedBy = "host", cascade = ALL)
//    private List<Review> reviews = new ArrayList<>();

    public Host edit(StageForm stageForm) {
        stageName = stageForm.getName();
        stageInfo = stageForm.getIntroduce();
        stageType = stageForm.getStageType();
        pay = stageForm.getPay();
        targetGender = stageForm.getTargetGender();
        targetAge = stageForm.getTargetAge();
        targetNumber = stageForm.getTargetMinCount();
        stageSize = stageForm.getStageSize();

        Map<String, String> requestAddress = stageForm.getAddress();
        String siDo = requestAddress.get("siDo");
        String sigun = requestAddress.get("siGun");
        String road = requestAddress.get("road");
        String detail = requestAddress.get("detail");
        stageAddress = new Address(siDo, sigun, road, detail);
        log.info("무대 주소 입력 완료 시도 : {} , 시군구 : {}, 로드 : {}, 디테일 : {}", siDo, sigun, road, detail);

        return this;
    }

    public void setRepImg(String repImg) {
        this.repImg = repImg;
    }
}
