package gigsproject.gigs.repository;

import gigsproject.gigs.domain.Star;
import gigsproject.gigs.request.StarSearch;
import gigsproject.gigs.response.StarCard;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface StarRepositoryCustom{

    Page<StarCard> getStarCardListCond(StarSearch starSearch, Pageable pageable);
}
