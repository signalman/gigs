package gigsproject.gigs.repository;

import gigsproject.gigs.domain.Post;
import gigsproject.gigs.request.StageSearch;

import java.util.List;

public interface PostRepositoryCustom {

    List<Post> getList(StageSearch stageSearch);

}
