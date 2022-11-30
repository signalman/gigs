package gigsproject.gigs.repository;

import gigsproject.gigs.request.StarEdit;
import gigsproject.gigs.request.StarSearch;
import gigsproject.gigs.response.StarCard;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface StarRepositoryCustom {

    Page<StarCard> getStarCardListCond(StarSearch starSearch, Pageable pageable);

    void updateStatus(Long id);

    void editStar(StarEdit starEdit);

    void editStarImg(Long starId, String url);
}
