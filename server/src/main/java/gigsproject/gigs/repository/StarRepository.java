package gigsproject.gigs.repository;

import gigsproject.gigs.domain.Star;
import gigsproject.gigs.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StarRepository extends JpaRepository<Star, Long>, StarRepositoryCustom {

//    Page<StarCard> getStarCardListCond(StarSearch starSearch, Pageable pageable);

    Star findByUser(User user);


//    void editStar(StarEdit starEdit);

//    void editStarImg(String repImg);
}
