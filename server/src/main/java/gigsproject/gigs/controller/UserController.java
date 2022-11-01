package gigsproject.gigs.controller;

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
    public String signup(@RequestBody){



        return "redirect:/";
    }





}
