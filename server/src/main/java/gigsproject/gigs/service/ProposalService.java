package gigsproject.gigs.service;

import gigsproject.gigs.domain.Post;
import gigsproject.gigs.domain.Proposal;
import gigsproject.gigs.domain.ShowStatus;
import gigsproject.gigs.domain.Star;
import gigsproject.gigs.repository.ProposalRepository;
import gigsproject.gigs.request.ProposalForm;
import gigsproject.gigs.response.ProposalDto;
import gigsproject.gigs.response.SignedOrCompDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

import static gigsproject.gigs.domain.ShowStatus.UNSIGNED;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class ProposalService {
    private final ProposalRepository proposalRepository;
    private final PostService postService;

    public List<ProposalDto> findUnsignedOrRejected(Long starId) {
        return proposalRepository.findUnsignedOrRejected(starId);
    }

    public List<ProposalDto> findUnsigned(Long hostId) {
        return proposalRepository.findUnsigned(hostId);
    }

    public List<SignedOrCompDto> findSignedOrCompStar(Long starId) {
        return proposalRepository.findSignedOrCompStar(starId);
    }

    public List<SignedOrCompDto> findSignedOrCompHost(Long hostId) {
        return proposalRepository.findSignedOrCompHost(hostId);
    }

    @Transactional
    public Proposal save(ProposalForm proposalForm, Star star, Post post) {

        Proposal proposal = Proposal.builder()
                .content(proposalForm.getContent())
                .star(star)
                .post(post)
                .createdAt(LocalDateTime.now())
                .showStartTime(post.getDate().atTime(post.getStartTime())) //localDateTime
                .showEndTime(post.getDate().atTime(post.getEndTime()))
                .showStatus(UNSIGNED)
                .build();
        return proposalRepository.save(proposal);
    }

    @Transactional
    public void delete(Long proposalId) {
        Proposal proposal = proposalRepository.findById(proposalId).orElseThrow(
                () -> new IllegalArgumentException("해당 제안서가 존재하지 않습니다.")
        );
        proposalRepository.delete(proposal);
    }

    @Transactional
    public ShowStatus changeStatus(Long proposalId, String status) {
        Proposal proposal = proposalRepository.findById(proposalId).orElseThrow(
                () -> new IllegalArgumentException("해당 제안서가 존재하지 않습니다.")
        );
        return proposal.editStatus(status);
    }

    public Proposal findById(Long proposalId) {
        return proposalRepository.findById(proposalId)
                .orElseThrow(() -> new IllegalArgumentException("해당하는 제안서가 존재하지 않습니다."));
    }
}
