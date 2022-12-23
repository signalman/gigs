package gigsproject.gigs.service;

import gigsproject.gigs.domain.Proposal;
import gigsproject.gigs.domain.Review;
import gigsproject.gigs.domain.Role;
import gigsproject.gigs.repository.ProposalRepository;
import gigsproject.gigs.repository.ReviewRepository;
import gigsproject.gigs.request.ReviewForm;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final ProposalRepository proposalRepository;

    @Transactional
    public void createEmptyReview(Proposal proposal) {
        log.info("{}", proposal);
        Review review = Review.builder()
                .proposal(proposal)
                .starToHostContent("")
                .hostToStarContent("")
                .host(proposal.getPost().getHost())
                .star(proposal.getStar())
                .build();
        log.info("서비스단 로그 : {}", review);
        reviewRepository.save(review);
        log.info("여기까지 통과완료");
    }

    public void getList() {
        List<Review> all = reviewRepository.findAll();
    }

    @Transactional
    public void edit(ReviewForm reviewForm, Long proposalId, Role role) {
        Review review = findByProposal(proposalId);

        if (role == Role.ROLE_STAR) {
            review.editFromStar(reviewForm);
        }
        if (role == Role.ROLE_HOST) {
            review.editFromHost(reviewForm);
        }
    }

    public Review findByProposal(Long proposalId) {
        Proposal proposal = proposalRepository.findById(proposalId)
                .orElseThrow(() -> new IllegalArgumentException("해당 제안서 존재 x"));
        return reviewRepository.findByProposal(proposal);
    }


//    public ReviewResponse getReview(Long reviewId) {
//        Review review = reviewRepository.findById(reviewId)
//                .orElseThrow(() -> new IllegalArgumentException("해당 리뷰가 존재하지 않습니다."));
//        return new ReviewResponse(review);
//    }
}
