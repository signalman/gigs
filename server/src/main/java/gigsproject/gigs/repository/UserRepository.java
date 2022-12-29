package gigsproject.gigs.repository;

import gigsproject.gigs.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUid(String uid);

    User findByUserId(Long userId);
}
