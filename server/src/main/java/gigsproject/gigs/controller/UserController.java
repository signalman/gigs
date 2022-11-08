package gigsproject.gigs.controller;

import gigsproject.gigs.config.oauth.NotSignedUser;
import gigsproject.gigs.config.oauth.SessionUser;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@RestController
@Slf4j
public class UserController {

    @GetMapping("/signup")
    NotSignedUser test(@RequestParam String uuid, HttpServletRequest request){
        NotSignedUser notSignedUser = (NotSignedUser)request.getSession().getAttribute(uuid);

        log.info("여기를 통과했습니다.");

        return notSignedUser;
    }

}
