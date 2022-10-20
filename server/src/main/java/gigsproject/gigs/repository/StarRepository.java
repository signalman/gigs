package gigsproject.gigs.repository;

import gigsproject.gigs.domain.Star;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StarRepository extends JpaRepository<Star, Long>, StarRepositoryCustom {

    public List<Star> getStarCardList();


}
