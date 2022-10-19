package gigsproject.gigs.repository;

import gigsproject.gigs.domain.Star;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StarRepository extends JpaRepository<Star, Long> {
}
