package gigsproject.gigs.repository;

import gigsproject.gigs.domain.Host;
import gigsproject.gigs.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HostRepository extends JpaRepository<Host, Long> {
    Host findByUser(User user);

}
