package gigsproject.gigs.repository;

import gigsproject.gigs.domain.Proposal;
import gigsproject.gigs.response.ProposalDto;

import java.util.List;

public interface ProposalRepositoryCustom {
    List<ProposalDto> findUnsignedOrRejected(Long starId);

    List<ProposalDto> findUnsigned(Long hostId);

    List<ProposalDto> findSignedOrCompStar(Long starId);

    List<ProposalDto> findSignedOrCompHost(Long hostId);


    void updateToSigned(Proposal proposal);

    void updateToRejected(Proposal proposal);
}
