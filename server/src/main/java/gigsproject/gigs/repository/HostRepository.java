package gigsproject.gigs.repository;

import gigsproject.gigs.domain.Host;
import gigsproject.gigs.domain.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HostRepository extends JpaRepository<Host, Long> {

    List<Host> findByStageName(String stageName);

}
