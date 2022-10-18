package gigsproject.gigs.Domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter @Setter @Entity
public class Star {
    @Id @GeneratedValue
    private Long id;
    @OneToOne(fetch = FetchType.LAZY) @JoinColumn(name = "userId")
    private User user;
    private String gender;
    private Integer memberNumber;
    private String introduce;
    private Integer showCount;
    private Boolean status;
}
