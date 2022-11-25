package gigsproject.gigs.service;

import gigsproject.gigs.domain.Star;
import gigsproject.gigs.domain.User;
import gigsproject.gigs.repository.StarRepository;
import gigsproject.gigs.request.StarEdit;
import gigsproject.gigs.request.StarSearch;
import gigsproject.gigs.response.StarCard;
import gigsproject.gigs.response.StarResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StarService {
    private final StarRepository starRepository;

    public void createStars(Star star) {
        starRepository.save(star);
    }

    public Star getOne(Long id) {
        return starRepository.getReferenceById(id);
    }

    public List<Star> findAll() {
        return starRepository.findAll();
    }

    public Page<StarCard> getStarCardListCond(StarSearch starSearch, Pageable pageable) {
        return starRepository.getStarCardListCond(starSearch, pageable);
    }

    public Star findByUser(User user) {
        return starRepository.findByUser(user);
    }

    public StarResponse findById(Long id) {
        Star star = starRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 스타가 존재하지 않습니다."));
        return new StarResponse(star);
    }

    @Transactional
    public void updateStatus(Long id) {
        starRepository.updateStatus(id);
    }

    public void editStar(StarEdit starEdit, Long starId) {
        starRepository.editStar(starEdit, starId);
    }
}
