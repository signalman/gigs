package gigsproject.gigs.domain;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Proposal {
    @Id @GeneratedValue
    private Long id;

    private Boolean type;

    @ManyToOne(fetch = FetchType.LAZY)  @JoinColumn(name = "hostId")
    private Host host;

    @ManyToOne(fetch = FetchType.LAZY ) @JoinColumn(name = "starId")
    private Star star;

    private LocalDateTime createdAt;

    @Lob
    private String content;

    private LocalDateTime showStartTime;
    private LocalDateTime showEndTime;

    @OneToOne(fetch = FetchType.LAZY ) @JoinColumn(name = "showStatusId")
    private ShowStatus showStatus;
}
