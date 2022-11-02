package gigsproject.gigs.controller;

import gigsproject.gigs.request.SignUpForm;
import gigsproject.gigs.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * 회원가입, 로그인
 */
@RestController
@RequiredArgsConstructor
@Slf4j
public class UserController {
    private final UserService userService;
    @PostMapping("/signup")
    public void signup(@RequestBody SignUpForm signUpForm){
        log.info("signup에 들어왔습니다");
        userService.createUser(signUpForm);
        log.info("잘 저장 되었습니다.");
    }





}
