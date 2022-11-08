package gigsproject.gigs.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@Controller
@Slf4j
public class UserController {

    @GetMapping("/signup")
    String test(HttpServletRequest request, HttpServletResponse response){
        request.getSession();



        return "redirect:http://localhost:3000/signup";
    }

}
