package gigsproject.gigs.controller;

import gigsproject.gigs.response.StarCard;
import gigsproject.gigs.service.StarService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class StarController {
    private final StarService starService;
    @GetMapping("/stars")
    public List<StarCard> getStarCardList(){
        return starService.getStarCardList();
    }

}
