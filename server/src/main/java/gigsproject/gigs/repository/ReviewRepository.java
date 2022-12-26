package gigsproject.gigs.repository;

import gigsproject.gigs.domain.Proposal;
import gigsproject.gigs.domain.Review;
import gigsproject.gigs.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long>, ReviewRepositoryCustom {
    Optional<Review> findByUserAndProposal(User user, Proposal proposal);
    List<Review> findByUser(User user);
    List<Review> findByRoleId(Long id);
}
