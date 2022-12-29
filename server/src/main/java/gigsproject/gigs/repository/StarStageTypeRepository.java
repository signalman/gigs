package gigsproject.gigs.repository;

import gigsproject.gigs.domain.Star;
import gigsproject.gigs.domain.StarStageType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StarStageTypeRepository extends JpaRepository<StarStageType, Long> {
    void deleteAllByStar(Star star);
}
