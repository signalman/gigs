package gigsproject.gigs.repository;

import gigsproject.gigs.domain.Host;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HostRepository extends JpaRepository<Host, Long> {
}
