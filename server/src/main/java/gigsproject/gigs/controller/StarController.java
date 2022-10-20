package gigsproject.gigs.controller;

import gigsproject.gigs.domain.*;
import gigsproject.gigs.response.StarCard;
import gigsproject.gigs.service.StarService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@Slf4j
public class StarController {
    private final StarService starService;
    @GetMapping("/stars")
    public List<StarCard> getStarCardList(){
        List<Star> stars = starService.getStarCardList();
        //entity -> dto로 변환
        List<StarCard> result = stars.stream()
                .map(star -> new StarCard(star))
                .collect(Collectors.toList());
        return result;
    }
}
