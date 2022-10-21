package gigsproject.gigs.controller;

import gigsproject.gigs.request.StageSearch;
import gigsproject.gigs.response.StageCard;
import gigsproject.gigs.service.PostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;

import static org.springframework.format.annotation.DateTimeFormat.ISO.DATE_TIME;

@RestController
@RequiredArgsConstructor
@Slf4j
public class StageController {

    private final PostService postService;

    /**
     * 무대 조회
     * 논의 사항 : startTime과 endTime에 대한 문제
     * Failed to convert value of type 'java.lang.String' to required type 'java.time.LocalDateTime
     * 그냥 시간을 String으로 넘겨받으니까 String 처리하고 로직에서 이걸 LocalDateTime 형태로 변환
     */
    @GetMapping("/stages")
    public List<StageCard> getList(@ModelAttribute StageSearch stageSearch) {
        return postService.getList(stageSearch);
    }


}
