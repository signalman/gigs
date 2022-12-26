package gigsproject.gigs.repository;

import gigsproject.gigs.response.ReviewDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ReviewRepositoryCustom {

    Page<ReviewDto> getListByScoreDesc(Pageable pageable);
}
