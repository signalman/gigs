package gigsproject.gigs.service;

import gigsproject.gigs.domain.Proposal;
import gigsproject.gigs.domain.Review;
import gigsproject.gigs.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReviewService {
    private final ReviewRepository reviewRepository;

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

}
