package gigsproject.gigs.controller;

import gigsproject.gigs.domain.Post;
import gigsproject.gigs.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class StageController {

    private final PostService postService;

    /**
     * 무대 조회
     * @return
     */
    @GetMapping("/stages")
    public List<Post> getList(@RequestParam String name) {
        return postService.getListByName(name);
    }


}
