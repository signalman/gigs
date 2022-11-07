package gigsproject.gigs.repository;

import gigsproject.gigs.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUid(String uid);
}
