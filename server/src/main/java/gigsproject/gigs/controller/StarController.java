package gigsproject.gigs.controller;

import gigsproject.gigs.domain.*;
import gigsproject.gigs.repository.GenreRepository;
import gigsproject.gigs.response.StarCard;
import gigsproject.gigs.response.StarDto;
import gigsproject.gigs.service.GenreService;
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
        log.info("get요청입니다: /stars");
        List<Star> stars = starService.getStarCardList();

        log.info("stars: {}", stars);
        //entity -> dto로 변환
        List<StarCard> result = stars.stream()
                .map(star -> new StarCard(star))
                .collect(Collectors.toList());

        log.info("result: {}", result);
        return result;
    }

    //todo starId로 조회.
    @GetMapping("/test")
    public StarDto getStar(@RequestParam Long id){
        log.info("get-mapping입니다.2");
        Star star = starService.getOne(id);
        StarDto starDto = new StarDto(star);
        return starDto;
    }

    /**
     * test용 star생성하는 api
     */
    @GetMapping("/create-stars")
    public void createStars(){
        log.info("hihi");
        User user1 = new User(null, "hoin", "myname", 1, "010", "eifj", new Address("dong", "gu", "si"));
        Star star1 = new Star(null, user1, "star1", "women", 1, "hi", 4, false, 3.1, null, null, null, null);
        StageType stageType = new StageType(null, "cafe");
        StarStageType starStageType1 = new StarStageType(null, star1, stageType);
        Genre genre1 = new Genre(null, "pop");
        Genre genre2 = new Genre(null, "hip-hop");
        StarImg starImg1 = new StarImg(null, "dkfjkd", star1);
        StarImg starImg2 = new StarImg(null, "aaaa", star1);

        starService.createStars(star1);
    }


}
