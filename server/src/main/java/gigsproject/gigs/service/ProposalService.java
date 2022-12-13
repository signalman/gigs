package gigsproject.gigs.service;

import gigsproject.gigs.domain.Post;
import gigsproject.gigs.domain.Proposal;
import gigsproject.gigs.domain.ShowStatus;
import gigsproject.gigs.domain.Star;
import gigsproject.gigs.repository.ProposalRepository;
import gigsproject.gigs.request.ProposalForm;
import gigsproject.gigs.response.ProposalDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProposalService {
    private final ProposalRepository proposalRepository;

    public List<ProposalDto> findUnsignedOrRejected(Long starId) {
        return proposalRepository.findUnsignedOrRejected(starId);
    }

    public List<ProposalDto> findUnsigned(Long hostId) {
        return proposalRepository.findUnsigned(hostId);
    }

    public List<ProposalDto> findSignedOrCompStar(Long starId) {
        return proposalRepository.findSignedOrCompStar(starId);
    }

    public List<ProposalDto> findSignedOrCompHost(Long hostId) {
        return proposalRepository.findSignedOrCompHost(hostId);
    }

    public void save(ProposalForm proposalForm, Star star, Post post) {

        Proposal proposal = Proposal.builder()
                .content(proposalForm.getContent())
                .star(star)
                .post(post)
                .createdAt(LocalDateTime.now())
                .showStartTime(post.getDate().atTime(post.getStartTime())) //localDateTime
                .showEndTime(post.getDate().atTime(post.getEndTime()))
                .showStatus(ShowStatus.UNSIGNED)
                .build();
        proposalRepository.save(proposal);
    }

    @Transactional
    public void delete(Long proposalId) {
        Proposal proposal = proposalRepository.findById(proposalId).orElseThrow(
                () -> new IllegalArgumentException("해당 제안서가 존재하지 않습니다.")
        );
        proposalRepository.delete(proposal);
    }

    @Transactional
    public void changeStatus(Long proposalId, String status) {
        Proposal proposal = proposalRepository.findById(proposalId).orElseThrow(
                () -> new IllegalArgumentException("해당 제안서가 존재하지 않습니다.")
        );
        if (status.equals("accept")) {
            proposalRepository.updateToSigned(proposal);
        } else if (status.equals("reject")) {
            proposalRepository.updateToRejected(proposal);
        }
    }
}
