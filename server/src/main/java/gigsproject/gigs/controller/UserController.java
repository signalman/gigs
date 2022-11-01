package gigsproject.gigs.controller;

import gigsproject.gigs.request.SignUpForm;
import gigsproject.gigs.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * 회원가입, 로그인
 */
@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    @PostMapping("/signup")
    public void signup(@RequestBody SignUpForm signUpForm){
        userService.createUser(signUpForm);

    }





}
