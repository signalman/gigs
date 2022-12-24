package gigsproject.gigs.service;

import gigsproject.gigs.domain.Proposal;
import gigsproject.gigs.domain.Review;
import gigsproject.gigs.domain.User;
import gigsproject.gigs.repository.ProposalRepository;
import gigsproject.gigs.repository.ReviewRepository;
import gigsproject.gigs.request.ReviewForm;
import gigsproject.gigs.response.ReviewDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

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
        Review reviewFromStar = Review.builder()
                .proposal(proposal)
                .content("")
                .score(0.0)
                .build();
        Review reviewFromHost = Review.builder()
                .proposal(proposal)
                .content("")
                .score(0.0)
                .build();
        reviewFromStar.setUser(proposal.getStar().getUser());
        reviewFromHost.setUser(proposal.getPost().getHost().getUser());
        reviewRepository.save(reviewFromStar);
        reviewRepository.save(reviewFromHost);
    }

    public List<ReviewDto> findByUser(User user) {
        log.info("***********user*********");
        return reviewRepository.findByUser(user)
                .stream()
                .map(r -> new ReviewDto(r))
                .collect(Collectors.toList());
    }

    @Transactional
    public void edit(User user, ReviewForm reviewForm) {
        Review review = findReview(user, reviewForm.getProposalId());
        review.edit(reviewForm);
    }



    public Review findReview(User user, Long proposalId) {
        Proposal proposal = proposalRepository.findById(proposalId)
                .orElseThrow(() -> new IllegalArgumentException("해당 제안서 존재 x"));
        return reviewRepository.findByUserAndProposal(user, proposal)
                .orElseThrow(()-> new IllegalArgumentException("해당 리뷰 존재 x"));
    }



//    public ReviewResponse getReview(Long reviewId) {
//        Review review = reviewRepository.findById(reviewId)
//                .orElseThrow(() -> new IllegalArgumentException("해당 리뷰가 존재하지 않습니다."));
//        return new ReviewResponse(review);
//    }
}
