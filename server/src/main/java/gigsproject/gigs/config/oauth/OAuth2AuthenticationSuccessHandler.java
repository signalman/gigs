package gigsproject.gigs.config.oauth;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

@Component
@Slf4j
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        log.info("석세스 헨들러 들어옴.");
        super.onAuthenticationSuccess(request, response, authentication);
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

//        Map<String, Object> properties = (Map<String, Object>) oAuth2User.getAttributes().get("properties");
//        String nickname = (String) properties.get("nickname");
        log.info("{}", oAuth2User.getAttributes());
//        log.info("{}", oAuth2User.getAttributes().get("properites"));
        log.info("{}", oAuth2User.getAuthorities());
        log.info("{}", oAuth2User.getName());


        if (response.isCommitted()) {
            return;
        }
        getRedirectStrategy().sendRedirect(request, response, "/");


    }
}
