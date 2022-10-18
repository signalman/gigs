package gigsproject.gigs.Domain;

import lombok.*;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class StarImg {
    @Id @GeneratedValue
    private Long id;
    private String url;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "starId")
    private Star star;
}
