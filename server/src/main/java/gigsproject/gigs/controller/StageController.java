package gigsproject.gigs.controller;

import gigsproject.gigs.request.StageSearch;
import gigsproject.gigs.response.HostResponse;
import gigsproject.gigs.response.StageCard;
import gigsproject.gigs.service.PostService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
public class StageController {

    private final PostService hostService;
    /**
     *  무대 검색
     */
    @GetMapping("/stages")
    public Page<StageCard> getList(@ModelAttribute StageSearch stageSearch, @PageableDefault(size = 10) Pageable pageable) {
        return hostService.getList(stageSearch, pageable);
    }

    /**
     * 무대 상세 정보 조회
     */
    @GetMapping("/stages/{hostId}")
    public HostResponse stageInfo(@PathVariable Long hostId){
        return hostService.findHost(hostId);
    }



}
