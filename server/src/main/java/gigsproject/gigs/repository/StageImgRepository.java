package gigsproject.gigs.repository;

import gigsproject.gigs.domain.StageImg;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StageImgRepository extends JpaRepository<StageImg, Long> {


    Optional<StageImg> findByUrl(String url);
}
