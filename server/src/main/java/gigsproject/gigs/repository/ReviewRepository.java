package gigsproject.gigs.repository;

import gigsproject.gigs.domain.Proposal;
import gigsproject.gigs.domain.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    Review findByProposal(Proposal proposal);
}
