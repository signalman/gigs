package gigsproject.gigs.config.oauth;

import gigsproject.gigs.domain.User;
import gigsproject.gigs.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.FilterChain;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Map;

import static java.util.Objects.isNull;

@Component
@Slf4j
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    private final UserRepository userRepository;
    private final HttpSession httpSession;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        //이미 회원인 사람.
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        String uid = oAuth2User.getAttribute("id").toString();
        Map<String, Object> properties = (Map<String, Object>) oAuth2User.getAttributes().get("properties");
        String name = (String) properties.get("nickname");

        User findUser = userRepository.findByUid(uid);

        String targetUrl = "http://localhost:3000";

        log.info("이미 회원입니다.");

        targetUrl = "http://localhost:3000";
//            getRedirectStrategy().sendRedirect(request, response, "http://localhost:3000");

        response.setHeader("Location", targetUrl);
        response.setStatus(302);
//        response.sendRedirect(targetUrl);
//        getRedirectStrategy().sendRedirect(request,response,targetUrl);
    }
}


