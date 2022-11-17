package gigsproject.gigs.response;

import gigsproject.gigs.domain.Proposal;
import gigsproject.gigs.domain.ShowStatus;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ProposalDto {

    private Long proposalId;
    private Long postId;
    private String stageName;
    private Long starId;
    private String starName;
    private LocalDateTime createdAt;
    private String content;
    private LocalDateTime showStartTime;
    private LocalDateTime showEndTime;
    private ShowStatus showStatus;

    public ProposalDto(Proposal proposal) {
        this.proposalId = proposal.getProposalId();
        this.postId = proposal.getPost().getPostId();
        this.stageName = proposal.getPost().getHost().getStageName();
        this.starId = proposal.getStar().getStarId();
        this.starName = proposal.getStar().getName();
        this.createdAt = proposal.getCreatedAt();
        this.showStartTime = proposal.getShowStartTime();
        this.showEndTime = proposal.getShowEndTime();
        this.showStatus = proposal.getShowStatus();
    }
}
