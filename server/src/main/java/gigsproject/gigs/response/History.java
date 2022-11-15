package gigsproject.gigs.response;

import gigsproject.gigs.domain.Proposal;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class History {
    private Long hostId;
    private String stageName;
    private Long starId;
    private String starName;
    private LocalDateTime dateTime;

    History(Proposal proposal) {
        this.hostId = proposal.getHost().getHostId();
        this.stageName = proposal.getHost().getStageName();
        this.starId = proposal.getStar().getStarId();
        this.starName = proposal.getStar().getName();
        this.dateTime = proposal.getShowStartTime();
    }
}
