package gigsproject.gigs.controller;

import gigsproject.gigs.config.oauth.NotSignedUser;
import gigsproject.gigs.request.SignUpForm;
import gigsproject.gigs.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;


@RestController
@Slf4j
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/signup")
    NotSignedUser sendNotSignedUser(@RequestParam String uuid, HttpServletRequest request) {
        NotSignedUser notSignedUser = (NotSignedUser) request.getSession().getAttribute(uuid);

        /**
         * 회원가입 페이지로 보내기 위해 저장한 세션을 지운다.
         */
        request.getSession().removeAttribute(uuid);
        request.getSession().removeAttribute("uuid");

        //TODO 여기서 log찍으면 두번 들어옴... 이유?

        return notSignedUser;
    }

    @PostMapping("/signup")
    void signUp(@RequestBody SignUpForm signUpForm, HttpServletResponse response){

        userService.createUser(signUpForm);
        response.setStatus(200);
    }

    void test(Authentication authentication){

    }
}
