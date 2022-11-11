package gigsproject.gigs.controller;

import gigsproject.gigs.config.oauth.NotSignedUser;
import gigsproject.gigs.request.SignUpForm;
import gigsproject.gigs.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.Session;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;


@RestController
@Slf4j
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
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
    void signUp(@RequestBody SignUpForm signUpForm, HttpServletResponse response){

        userService.createUser(signUpForm);
        response.setStatus(200);
    }

    @GetMapping("/wait")
    void waitLogin(HttpServletResponse response, Authentication authentication) throws IOException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String userName = oAuth2User.getName();
        Cookie cookie = new Cookie("userName", userName);
        cookie.setPath("/");
        response.addCookie(cookie);
        response.sendRedirect("http://localhost:3000");
    }

    @GetMapping("/test/auth")
    void test(Authentication authentication, HttpServletRequest request, HttpServletResponse response){

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        log.info("인증 객체 : {}", oAuth2User);
        log.info("인증 객체 : {}", oAuth2User.getName());
        log.info("인증 객체 : {}", oAuth2User.getAttributes());
        log.info("인증 객체 : {}", oAuth2User.getAuthorities());
        Cookie cookie = new Cookie("dkf", "kdf");
        response.addCookie(cookie);
    }
}
