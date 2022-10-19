package gigsproject.gigs.domain;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Star {
    @Id @GeneratedValue
    private Long id;
    @OneToOne(fetch = FetchType.LAZY) @JoinColumn(name = "userId")
    private User user;
    private String name;
    private String gender;
    private Integer memberNumber;
    private String introduce;
    private Integer showCount;
    private Boolean status;
    private Double score;

    /**
     * 양방향 연관관계 추가
     */
    @OneToMany(mappedBy = "star")
    private List<StarGenre> starGenres = new ArrayList<>();
}
