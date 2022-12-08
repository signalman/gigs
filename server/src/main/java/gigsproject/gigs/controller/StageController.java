package gigsproject.gigs.controller;

import gigsproject.gigs.config.oauth.OAuth2UserCustom;
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
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

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
     * 호스트 등록 + 수정 (동일)
     */
    @PutMapping("/stages")
    public String create(@AuthenticationPrincipal OAuth2UserCustom oAuth2UserCustom,
                         @RequestBody StageForm stageForm
    ) throws IOException {

        User user = oAuth2UserCustom.getUser();
        if (user.getRole() != Role.ROLE_HOST) {
            throw new IllegalArgumentException("호스트가 아닙니다.");
        }

        Long hostId = hostService.edit(user, stageForm);
        return hostId + ": 수정완료";
    }

    /**
     * 무대 삭제 기능 (조회 x, 다시 빈 객체로 남아 있음)
     *
     * @param oAuth2UserCustom
     * @return
     * @throws IOException
     */
    @DeleteMapping("/stages")
    public String delete(@AuthenticationPrincipal OAuth2UserCustom oAuth2UserCustom) throws IOException {
        User user = oAuth2UserCustom.getUser();
        if (user.getRole() != Role.ROLE_HOST) {
            throw new IllegalArgumentException("호스트가 아닙니다.");
        }
        hostService.delete(user);
        return "";
    }

    /**
     * 이미지 추가
     *
     * @return
     */
    @PostMapping("/stages/images")
    public Map<Long, String> uploadImg(List<MultipartFile> multipartFileList, @AuthenticationPrincipal OAuth2UserCustom oAuth2UserCustom) {
        User user = oAuth2UserCustom.getUser();
        if (user.getRole() != Role.ROLE_HOST) {
            throw new IllegalArgumentException("호스트가 아닙니다.");
        }
        return hostService.uploadImgs(user, multipartFileList);
    }

    /**
     * 이미지 삭제
     *
     * @param imageId
     */
    @DeleteMapping("/stages/images/{imageId}")
    public void deleteImg(@PathVariable Long imageId) {
        hostService.deleteImage(imageId);
    }

    /**
     * 대표 이미지 변경
     */
    @PostMapping("/stages/rep-image")
    public String updateRepImage(@RequestParam(name = "file") MultipartFile multipartFile, @AuthenticationPrincipal OAuth2UserCustom oAuth2UserCustom) {
        User user = oAuth2UserCustom.getUser();
        if (user.getRole() != Role.ROLE_HOST) {
            throw new IllegalArgumentException("호스트가 아닙니다.");
        }

        return hostService.editRepImg(user, multipartFile);
    }

    /**
     * 대표 이미지 삭제
     */
    @DeleteMapping("/stages/rep-image")
    public void deleteRepImage(@AuthenticationPrincipal OAuth2UserCustom oAuth2UserCustom) {
        User user = oAuth2UserCustom.getUser();
        hostService.deleteRepImage(user);
    }
}
