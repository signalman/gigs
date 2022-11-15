package gigsproject.gigs.response;

import gigsproject.gigs.domain.Proposal;
import gigsproject.gigs.domain.ShowStatus;

import java.time.LocalDateTime;

public class ProposalDto {

    private Long proposalId;
    private Long hostId;
    private String stageName;
    private Long starId;
    private String starName;
    private LocalDateTime createdAt;
    private String content;
    private LocalDateTime showStartTime;
    private LocalDateTime showEndTime;
    private ShowStatus showStatus;

    ProposalDto(Proposal proposal) {
        this.proposalId = proposal.getProposalId();
        this.hostId = proposal.getHost().getHostId();
        this.stageName = proposal.getHost().getStageName();
        this.starId = proposal.getStar().getStarId();
        this.starName = proposal.getStar().getName();
        this.createdAt = proposal.getCreatedAt();
        this.showStartTime = proposal.getShowStartTime();
        this.showEndTime = proposal.getShowEndTime();
        this.showStatus = proposal.getShowStatus();
    }
}
