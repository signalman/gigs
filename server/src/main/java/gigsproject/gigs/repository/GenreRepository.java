package gigsproject.gigs.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import gigsproject.gigs.domain.Genre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GenreRepository extends JpaRepository<Genre, Long>,GenreCustomRepository {
}
