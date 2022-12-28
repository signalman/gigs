package gigsproject.gigs.config.oauth;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@RequiredArgsConstructor
public class OAuth2LogoutSuccessHandler implements LogoutSuccessHandler {
    @Override
    public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        Cookie userCookie = new Cookie("userId", null);
        Cookie roleCookie = new Cookie("role", null);
        userCookie.setMaxAge(0);
        roleCookie.setMaxAge(0);
        userCookie.setDomain("gigs-web.com");
        roleCookie.setDomain("gigs-web.com");
        response.addCookie(userCookie);
        response.addCookie(roleCookie);
        response.setStatus(200);
    }
}
