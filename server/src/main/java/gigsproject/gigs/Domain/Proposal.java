package gigsproject.gigs.Domain;

import lombok.*;

import javax.persistence.*;
import javax.xml.stream.events.StartDocument;
import java.time.LocalDateTime;
import java.util.Date;

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

    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "starId")
    private Star star;

    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime createdAt;

    @Lob
    private String content;

    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime showStartTime;

    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime showEndTime;

    @OneToOne(fetch = FetchType.LAZY) @JoinColumn(name = "showStatusId")
    private ShowStatus showStatus;
}
