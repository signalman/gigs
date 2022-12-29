package gigsproject.gigs.controller;

import gigsproject.gigs.response.HomeRes;
import gigsproject.gigs.response.StageCard;
import gigsproject.gigs.response.StarCard;
import gigsproject.gigs.service.HostService;
import gigsproject.gigs.service.StarService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class HomeController {
    private final StarService starService;
    private final HostService hostService;

    @GetMapping("/home")
    public ResponseEntity home() {
        try {
            List<StarCard> starCards = starService.getRecentStars();
            List<StageCard> stageCards = hostService.getRecentStages();
            HomeRes homeRes = new HomeRes(starCards, stageCards);
            return ResponseEntity.ok().body(homeRes);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
