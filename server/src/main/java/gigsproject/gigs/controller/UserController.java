package gigsproject.gigs.controller;

import gigsproject.gigs.config.oauth.NotSignedUser;
import gigsproject.gigs.config.oauth.OAuth2UserCustom;
import gigsproject.gigs.domain.*;
import gigsproject.gigs.request.SignUpForm;
import gigsproject.gigs.response.History;
import gigsproject.gigs.response.MyPage;
import gigsproject.gigs.response.ProposalDto;
import gigsproject.gigs.response.UserDto;
import gigsproject.gigs.service.HostService;
import gigsproject.gigs.service.ProposalService;
import gigsproject.gigs.service.StarService;
import gigsproject.gigs.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;


//@RestController
@Slf4j
@RequiredArgsConstructor
@RestController
public class UserController {
    private final UserService userService;
    private final ProposalService proposalService;
    private final StarService starService;
    private final HostService hostService;

    @GetMapping("/signup")
    NotSignedUser sendNotSignedUser(@RequestParam String uuid, HttpServletRequest request) {

        NotSignedUser notSignedUser = (NotSignedUser) request.getSession().getAttribute(uuid);
        /**
         * '회원가입 페이지로 보내기 위해 저장한' 세션을 지운다.
         */
        request.getSession().removeAttribute(uuid);
        request.getSession().removeAttribute("uuid");

        return notSignedUser;
    }

    @PostMapping("/signup")
    void signUp(@RequestBody SignUpForm signUpForm, HttpServletResponse response) {

        userService.createUser(signUpForm);
        response.setStatus(200);
    }

    /**
     * 로그인 성공시 쿠키보내고 redirect 하는 컨트롤러
     */
    @GetMapping("/wait")
    void waitLogin(HttpServletResponse response, @AuthenticationPrincipal OAuth2UserCustom oAuth2UserCustom) throws IOException {

        User user = oAuth2UserCustom.getUser();
        Long userId = user.getUserId();

        Cookie cookie = new Cookie("userId", userId.toString());
        cookie.setPath("/");
        cookie.setDomain("localhost");
        response.addCookie(cookie);

        response.sendRedirect("http://localhost:3000");
    }

    @GetMapping("/mypage")
    MyPage myPage(@AuthenticationPrincipal OAuth2UserCustom oAuth2UserCustom) {

        User loginUser = oAuth2UserCustom.getUser();
        UserDto user = new UserDto(loginUser);
        if (loginUser.getRole() == Role.ROLE_STAR) { //로그인 한 유저가 스타
            Star loginStar = starService.findByUser(loginUser);
            List<History> histories = proposalService.findStarHistory(loginStar.getStarId());
            Long starId = loginStar.getStarId();
            String starImgUrl = loginStar.getStarImgs().isEmpty() ? "" : loginStar.getStarImgs().get(0).getUrl();
            StarStatus status = loginStar.getStatus();
            MyPage starMyPage = new MyPage(user, starId, status, starImgUrl, histories);
            return starMyPage;
        }//로그인 한 유저가 호스트
        Host loginHost = hostService.findByUser(loginUser);
        List<History> histories = proposalService.findHostHistory(loginHost.getHostId());
        List<ProposalDto> proposals = proposalService.findNotCompProposals(loginHost.getHostId());
        Long hostId = loginHost.getHostId();
        String stageImgUrl = loginHost.getImgs().isEmpty() ? "" : loginHost.getImgs().get(0).getUrl();
        MyPage hostMyPage = new MyPage(user, hostId, stageImgUrl, histories, proposals);
        return hostMyPage;
    }

    @PostMapping("/mypage/status")
    void updateStarStatus(HttpServletResponse response, @AuthenticationPrincipal OAuth2UserCustom oAuth2UserCustom) {
//        try {
        User user = oAuth2UserCustom.getUser();
        Star star = starService.findByUser(user);
        starService.updateStatus(star.getStarId());
        response.setStatus(200);
        log.info("1111111");
//        } catch (Exception e) {
//            response.setStatus(404);
        log.info("22222");
//        }
        log.info("33333");
    }

    /**
     * api테스트용.
     */
    @GetMapping("/test/auth")
    void test(Authentication authentication, HttpServletRequest request, HttpServletResponse response) {

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        log.info("인증 객체 : {}", oAuth2User);
        log.info("인증 객체 : {}", oAuth2User.getName());
        log.info("인증 객체 : {}", oAuth2User.getAttributes());
        log.info("인증 객체 : {}", oAuth2User.getAuthorities());
        Cookie cookie = new Cookie("dkf", "kdf");
        response.addCookie(cookie);
    }
}
