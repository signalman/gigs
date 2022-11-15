package gigsproject.gigs.response;

import gigsproject.gigs.domain.Proposal;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class History {
    private Long postId;
    private String stageName;
    private Long starId;
    private String starName;
    private LocalDateTime dateTime;

    public History(Proposal proposal) {
        this.postId = proposal.getPost().getPostId();
        this.stageName = proposal.getPost().getHost().getStageName();
        this.starId = proposal.getStar().getStarId();
        this.starName = proposal.getStar().getName();
        this.dateTime = proposal.getShowStartTime();
    }
}
