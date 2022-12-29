package gigsproject.gigs.domain;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@AllArgsConstructor
@Builder(access = AccessLevel.PUBLIC)
public class Star extends BaseTimeEntity {
    @Id
    @GeneratedValue
    private Long starId;
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "userId")
    private User user;
    private String name;
    @Enumerated(EnumType.STRING)
    private Gender gender;
    private Integer memberNumber;
    private String introduce;
    private Integer showCount;
    @Enumerated(EnumType.STRING)
    private StarStatus status;
    private Double score;
    private String repImg;
    /**
     * 양방향 연관관계 추가
     */
    @OneToMany(mappedBy = "star")
    @Builder.Default
    private List<StarStageType> starStageTypes = new ArrayList<>();

    @OneToMany(mappedBy = "star")
    @Builder.Default
    private List<StarGenre> starGenres = new ArrayList<>();

    @OneToMany(mappedBy = "star")
    @Builder.Default
    private List<StarImg> starImgs = new ArrayList<>();

//    @OneToMany(mappedBy = "star")
//    @Builder.Default
//    private List<Review> reviews = new ArrayList<>();

    @OneToMany(mappedBy = "star")
    @Builder.Default
    private List<Proposal> proposals = new ArrayList<>();
}
