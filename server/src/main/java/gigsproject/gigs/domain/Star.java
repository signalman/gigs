package gigsproject.gigs.domain;

import lombok.*;

import javax.persistence.*;

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
}
