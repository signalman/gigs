package gigsproject.gigs.repository;

import gigsproject.gigs.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
