package gigsproject.gigs.config.oauth;

import gigsproject.gigs.domain.User;
import gigsproject.gigs.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


@Component
@Slf4j
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        //이미 회원인 사람.
        log.info("이미 회원입니다. 자동로그인 진행합니다.");
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        response.addCookie(new Cookie("hi", "hi"));
        response.sendRedirect("http://localhost:3000");

    }
}


