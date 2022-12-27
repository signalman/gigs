package gigsproject.gigs.service;

import gigsproject.gigs.domain.*;
import gigsproject.gigs.repository.StarGenreRepository;
import gigsproject.gigs.repository.StarRepository;
import gigsproject.gigs.repository.StarStageTypeRepository;
import gigsproject.gigs.request.StarEdit;
import gigsproject.gigs.request.StarSearch;
import gigsproject.gigs.response.ReviewDto;
import gigsproject.gigs.response.StarCard;
import gigsproject.gigs.response.StarResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class StarService {
    private final StarRepository starRepository;
    private final StarGenreRepository starGenreRepository;
    private final StarStageTypeRepository starStageTypeRepository;
    private final ReviewService reviewService;

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
        List<ReviewDto> reviews = reviewService.findByTarget(star.getUser());
        return new StarResponse(star, reviews);
    }

    @Transactional
    public void updateStatus(Long id) {
        starRepository.updateStatus(id);
    }

    @Transactional
    public void editStar(StarEdit starEdit) {
        Long starId = starEdit.getStarId();

        Star findStar = starRepository.findById(starId).orElseThrow(
                () -> new IllegalArgumentException("해당 스타가 없습니다.")
        );

        //스타 장르 지우기
        starGenreRepository.deleteAllByStar(findStar);

        //스타 장르 삽입
        if (starEdit.getGenres() != null) {
            List<Genre> genres = starEdit.getGenres();
            for (Genre genre : genres) {
                StarGenre starGenre = StarGenre.builder()
                        .genre(genre)
                        .star(findStar)
                        .build();
                starGenreRepository.save(starGenre);
            }
        }

        //스타 스테이지 타입 지우기
        starStageTypeRepository.deleteAllByStar(findStar);

        //스타 스테이지 타입 삽입
        if (starEdit.getStageTypes() != null) {
            List<StageType> stageTypes = starEdit.getStageTypes();
            for (StageType stageType : stageTypes) {
                StarStageType starStageType = StarStageType.builder()
                        .stageType(stageType)
                        .star(findStar)
                        .build();
                starStageTypeRepository.save(starStageType);
            }
        }
        //스타 엔티티 수정
        starRepository.editStar(starEdit);
    }

    public Star findStarById(Long starId) {
        Star star = starRepository.findById(starId).orElseThrow(
                () -> new IllegalArgumentException("해당 스타가 존재하지 않습니다.")
        );
        return star;
    }

    @Transactional
    public void editStarImg(Long starId, String url) {
        starRepository.editStarImg(starId, url);
    }

    public List<StarCard> getRecentStars() {
        return starRepository.findRecentStars();
    }
}
