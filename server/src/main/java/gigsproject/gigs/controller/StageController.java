package gigsproject.gigs.controller;

import gigsproject.gigs.request.StageSearch;
import gigsproject.gigs.response.StageCard;
import gigsproject.gigs.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class StageController {

    private final PostService postService;

    /**
     * 무대 조회
     */
    @GetMapping("/stages")
    public List<StageCard> getList(@ModelAttribute StageSearch stageSearch) {
        return postService.getList(stageSearch);
    }


}
