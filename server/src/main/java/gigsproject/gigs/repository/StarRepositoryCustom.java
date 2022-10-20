package gigsproject.gigs.repository;

import gigsproject.gigs.domain.Star;
import gigsproject.gigs.response.StarCard;

import java.util.List;

public interface StarRepositoryCustom{

    List<Star> getStarCardList();
}
