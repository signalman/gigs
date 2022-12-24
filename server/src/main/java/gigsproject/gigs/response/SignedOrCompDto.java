package gigsproject.gigs.response;

import gigsproject.gigs.domain.Proposal;
import gigsproject.gigs.domain.Review;
import gigsproject.gigs.domain.Role;
import gigsproject.gigs.domain.ShowStatus;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

import static java.util.Objects.isNull;

@Data
//마이페이지 주인 상대방에게 리뷰를 작성하였는지 여부, 내용 중요x
public class SignedOrCompDto {
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
    private String starPhoneNumber; //스타의 전화번호
    private String hostPhoneNumber; //호스트의 전화번호

    public SignedOrCompDto(Proposal proposal) {
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
        this.starPhoneNumber = proposal.getStar().getUser().getPhone();
        this.hostPhoneNumber = proposal.getPost().getHost().getUser().getPhone();
//        if (showStatus.equals(ShowStatus.COMP)) {
//            List<Review> reviews = proposal.getReviews();
//            for (Review review : reviews) {
//                Role role = review.getUser().getRole();
//                if (role == Role.ROLE_HOST) {
//                    this.hostToStarReviewed = !review.getContent().equals("");
//                } else {
//                    this.starToHostReviewed = !review.getContent().equals("");
//                }
//            }
//        }
    }
}
