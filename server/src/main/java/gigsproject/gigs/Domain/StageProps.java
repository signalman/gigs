package gigsproject.gigs.Domain;

import lombok.*;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class StageProps {
    @Id @GeneratedValue
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "hostId")
    private Host host;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Props props;
}
