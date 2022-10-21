package gigsproject.gigs.controller;

import gigsproject.gigs.domain.*;
import gigsproject.gigs.request.StarSearch;
import gigsproject.gigs.response.StarCard;
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
    public Page<StarCard> getStarCardListCond(@ModelAttribute StarSearch starSearch, Pageable pageable){
        Page<StarCard> result = starService.getStarCardListCond(starSearch, pageable);
        return result;

    }

}
