package gigsproject.gigs.repository;

import gigsproject.gigs.domain.Star;
import gigsproject.gigs.domain.StarGenre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StarGenreRepository extends JpaRepository<StarGenre, Long> {
    void deleteAllByStar(Star star);
}
