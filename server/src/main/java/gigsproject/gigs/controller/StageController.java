package gigsproject.gigs.controller;

import gigsproject.gigs.request.StageSearch;
import gigsproject.gigs.response.StageCard;
import gigsproject.gigs.service.PostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class StageController {

    private final PostService postService;

    /**
     * 무대 조회
     * JPA Specification 공부중
     *
     * --param list --
     * name
     * stageTypes
     * genres
     * address
     * startTime, endTime
     * targetGender
     * targetAge
     * targetMinCount
     */
    @GetMapping("/stages")
    public List<StageCard> getList(@ModelAttribute StageSearch stageSearch) {

        return postService.getList(stageSearch);
    }


}
