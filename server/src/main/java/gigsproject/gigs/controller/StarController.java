package gigsproject.gigs.controller;

import gigsproject.gigs.request.StarEdit;
import gigsproject.gigs.request.StarSearch;
import gigsproject.gigs.response.StarCard;
import gigsproject.gigs.response.StarResponse;
import gigsproject.gigs.service.StarService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
@Slf4j
public class StarController {
    private final StarService starService;

    @GetMapping("/stars")
    public Page<StarCard> getStarCardListCond(@ModelAttribute StarSearch starSearch, Pageable pageable) {
        Page<StarCard> result = starService.getStarCardListCond(starSearch, pageable);
        return result;

    }

    @GetMapping("/stars/{starId}")
    public StarResponse starInfo(@PathVariable Long starId) {
        return starService.findById(starId);
    }

    @PutMapping("/stars/{starId}")
    public void update(@RequestBody StarEdit starEdit, @PathVariable Long starId) {
        //장르, 성별, 멤버, 선호 무대, 스타이름, 소개글
        log.info("통과했습니다.");
        starService.editStar(starEdit, starId);

    }

}
