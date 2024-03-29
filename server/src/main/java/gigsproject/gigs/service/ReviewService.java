package gigsproject.gigs.service;

import gigsproject.gigs.domain.Proposal;
import gigsproject.gigs.domain.Review;
import gigsproject.gigs.domain.Role;
import gigsproject.gigs.domain.User;
import gigsproject.gigs.repository.HostRepository;
import gigsproject.gigs.repository.ProposalRepository;
import gigsproject.gigs.repository.ReviewRepository;
import gigsproject.gigs.repository.StarRepository;
import gigsproject.gigs.request.ReviewForm;
import gigsproject.gigs.response.ReviewDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
    private final HostRepository hostRepository;
    private final StarRepository starRepository;

    @Transactional
    public void createEmptyReview(Proposal proposal) {
        log.info("{}", proposal);
        Review reviewFromStar = Review.builder()
                .proposal(proposal)
                .content("")
                .score(0.0)
                .roleId(proposal.getPost().getHost().getHostId())
                .build();
        Review reviewFromHost = Review.builder()
                .proposal(proposal)
                .content("")
                .score(0.0)
                .roleId(proposal.getStar().getStarId())
                .build();
        reviewFromStar.setUser(proposal.getStar().getUser());
        reviewFromHost.setUser(proposal.getPost().getHost().getUser());
        reviewRepository.save(reviewFromStar);
        reviewRepository.save(reviewFromHost);
    }


    /**
     * 이 유저가 피작성자로 있는 모든 리뷰 불러오기
     *
     * @param user : 피작성자
     * @return
     */
    public List<ReviewDto> findByTarget(User user) {
        Long roleId; //피작성자의 role id

        if (user.getRole() == Role.ROLE_HOST) {
            roleId = hostRepository.findByUser(user).getHostId();
        } else {
            roleId = starRepository.findByUser(user).getStarId();
        }

        log.info("role id : {} ", roleId);

        return reviewRepository.findByRoleId(roleId)
                .stream()
                .map(r -> new ReviewDto(r))
                .collect(Collectors.toList());
    }

    public List<ReviewDto> findByWriter(User user) {
        return reviewRepository.findByUser(user).stream()
                .map(ReviewDto::new).collect(Collectors.toList());
    }

    @Transactional
    public void edit(User user, ReviewForm reviewForm) {
        Proposal proposal = proposalRepository.findById(reviewForm.getProposalId())
                .orElseThrow(() -> new IllegalArgumentException("해당 제안서 존재 x"));
        Review review = reviewRepository.findByUserAndProposal(user, proposal)
                .orElseThrow(() -> new IllegalArgumentException("해당 리뷰 존재 x"));
        review.edit(reviewForm);
    }

    public Page<ReviewDto> getReviewsByScoreDesc(Pageable pageable) {
        return reviewRepository.getListByScoreDesc(pageable);
    }
}
