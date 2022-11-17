package gigsproject.gigs.service;

import gigsproject.gigs.repository.ProposalRepository;
import gigsproject.gigs.response.History;
import gigsproject.gigs.response.ProposalDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
}
