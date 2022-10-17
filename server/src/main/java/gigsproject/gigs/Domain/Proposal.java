package gigsproject.gigs.Domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.xml.stream.events.StartDocument;
import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Setter
@Entity
public class Proposal {
    @Id @GeneratedValue
    private Long id;

    private Boolean type;

    @ManyToOne(fetch = FetchType.LAZY)  @JoinColumn(name = "id")
    private Host host;

    @ManyToOne @JoinColumn(name = "id")
    private Star star;

    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime createdAt;

    @Lob
    private String content;

    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime showStartTime;

    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime showEndTime;

    @OneToOne @JoinColumn(name = "id")
    private ShowStatus showStatus;
}
