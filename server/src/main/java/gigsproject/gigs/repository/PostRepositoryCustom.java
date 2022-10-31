package gigsproject.gigs.repository;

import gigsproject.gigs.domain.Post;
import gigsproject.gigs.request.StageSearch;
import gigsproject.gigs.response.StageCard;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface PostRepositoryCustom {

    Page<StageCard> getList(StageSearch stageSearch, Pageable pageable);

}
