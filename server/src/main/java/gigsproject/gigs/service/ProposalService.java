package gigsproject.gigs.service;

import gigsproject.gigs.domain.Post;
import gigsproject.gigs.domain.Proposal;
import gigsproject.gigs.domain.ShowStatus;
import gigsproject.gigs.domain.Star;
import gigsproject.gigs.repository.ProposalRepository;
import gigsproject.gigs.request.ProposalForm;
import gigsproject.gigs.response.History;
import gigsproject.gigs.response.ProposalDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProposalService {
    private final ProposalRepository proposalRepository;

    public List<History> findStarHistory(Long starId) {
        return proposalRepository.findStarHistory(starId);
    }

    public List<History> findHostHistory(Long hostId) {
        return proposalRepository.findHostHistory(hostId);
    }

    public List<ProposalDto> findNotCompProposals(Long hostId) {
        return proposalRepository.findNotCompProposals(hostId);
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
}
