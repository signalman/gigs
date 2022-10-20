package gigsproject.gigs.service;

import gigsproject.gigs.domain.Star;
import gigsproject.gigs.repository.StarRepository;
import gigsproject.gigs.response.StarCard;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StarService {
    private final StarRepository starRepository;
    public List<Star> getStarCardList() {
        return starRepository.getStarCardList();
    }

    public void createStars(Star star){
        starRepository.save(star);
    }

    public Star getOne(Long id) {
        return starRepository.getReferenceById(id);
    }

    public List<Star> findAll(){
        return starRepository.findAll();
    }
}
