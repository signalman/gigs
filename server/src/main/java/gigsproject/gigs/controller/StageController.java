package gigsproject.gigs.controller;

import gigsproject.gigs.config.oauth.OAuth2UserCustom;
import gigsproject.gigs.domain.Host;
import gigsproject.gigs.domain.Role;
import gigsproject.gigs.domain.User;
import gigsproject.gigs.request.StageForm;
import gigsproject.gigs.request.StageSearch;
import gigsproject.gigs.response.HostResponse;
import gigsproject.gigs.response.StageCard;
import gigsproject.gigs.service.HostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RestController
@RequiredArgsConstructor
@Slf4j
public class StageController {

    private final HostService hostService;

    /**
     * 무대 검색
     */
    @GetMapping("/stages")
    public Page<StageCard> getList(@ModelAttribute StageSearch stageSearch, @PageableDefault(size = 10) Pageable pageable) {
        return hostService.getList(stageSearch, pageable);
    }

    /**
     * 무대 상세 정보 조회
     */
    @GetMapping("/stages/{hostId}")
    public HostResponse stageInfo(@PathVariable Long hostId) {
        return hostService.findHost(hostId);
    }

    /**
     *  호스트 등록 + 수정 (동일)
     */
    @PutMapping("/stages")
    public void create(@AuthenticationPrincipal OAuth2UserCustom oAuth2UserCustom,
                       @ModelAttribute StageForm stageForm,
                       HttpServletResponse response) throws IOException {
        User user = oAuth2UserCustom.getUser();
        if (user.getRole() != Role.ROLE_HOST) {
            throw new IllegalArgumentException("호스트가 아닙니다.");
        }
        Long hostId = hostService.edit(user, stageForm);

        String redirecturl = "/stages/" + hostId;
        response.sendRedirect(redirecturl);
    }

}
