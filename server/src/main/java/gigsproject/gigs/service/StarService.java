package gigsproject.gigs.service;

import gigsproject.gigs.domain.Star;
import gigsproject.gigs.repository.StarRepository;
import gigsproject.gigs.request.StarSearch;
import gigsproject.gigs.response.StarCard;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StarService {
    private final StarRepository starRepository;

    public void createStars(Star star){
        starRepository.save(star);
    }

    public Star getOne(Long id) {
        return starRepository.getReferenceById(id);
    }

    public List<Star> findAll(){
        return starRepository.findAll();
    }

    public Page<StarCard> getStarCardListCond(StarSearch starSearch, Pageable pageable) {
        return starRepository.getStarCardListCond(starSearch, pageable);
    }
}
