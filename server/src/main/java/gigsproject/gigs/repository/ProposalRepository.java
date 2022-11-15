package gigsproject.gigs.repository;

import gigsproject.gigs.domain.Proposal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProposalRepository extends JpaRepository<Proposal, Long>, ProposalRepositoryCustom {
}
