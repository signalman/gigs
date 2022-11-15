package gigsproject.gigs.repository;

import gigsproject.gigs.response.History;
import gigsproject.gigs.response.ProposalDto;

import java.util.List;

public interface ProposalRepositoryCustom {
    List<History> findStarHistory(Long starId);

    List<History> findHostHistory(Long hostId);

    List<ProposalDto> findNotCompProposals(Long hostId);


}
