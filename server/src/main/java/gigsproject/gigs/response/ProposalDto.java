package gigsproject.gigs.response;

import gigsproject.gigs.domain.Proposal;
import gigsproject.gigs.domain.ShowStatus;
import lombok.Data;

import java.time.LocalDateTime;

import static java.util.Objects.isNull;

@Data
public class ProposalDto {

    private Long proposalId;
    private Long postId;
    private Long starId;
    private String starName;
    private String starRepImg;
    private String stageName;
    private String hostRepImg;
    private LocalDateTime createdAt;
    private String content;
    private LocalDateTime showStartTime;
    private LocalDateTime showEndTime;
    private ShowStatus showStatus;

    public ProposalDto(Proposal proposal) {
        this.proposalId = proposal.getProposalId();
        this.postId = proposal.getPost().getPostId();
        this.starRepImg = isNull(proposal.getStar().getRepImg()) ? "" : proposal.getStar().getRepImg();
        this.hostRepImg = isNull(proposal.getPost().getHost().getRepImg()) ? "" : proposal.getPost().getHost().getRepImg();
        this.stageName = proposal.getPost().getHost().getStageName();
        this.content = isNull(proposal.getContent()) ? "" : proposal.getContent();
        this.starId = proposal.getStar().getStarId();
        this.starName = proposal.getStar().getName();
        this.createdAt = proposal.getCreatedAt();
        this.showStartTime = proposal.getShowStartTime();
        this.showEndTime = proposal.getShowEndTime();
        this.showStatus = proposal.getShowStatus();
    }
}
