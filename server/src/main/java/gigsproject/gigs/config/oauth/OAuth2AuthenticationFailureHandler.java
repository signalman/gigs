package gigsproject.gigs.config.oauth;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Component
@RequiredArgsConstructor
@Slf4j
public class OAuth2AuthenticationFailureHandler implements AuthenticationFailureHandler {

    private RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {

        log.info("로그인 실패");
        //로그인 실패 구현.
        String errorMessage = URLEncoder.encode(exception.getMessage(), StandardCharsets.UTF_8) ;


        //여기는 카카오 인증까지는 마친 상태고, 우리 회원이 아니다. 이름/id 까지는 받아올수있음.

        //세션에 저장을 안하는 경우

        //쿠키로 클라쪽으로 보내는 방법.

        //세션에 저장을 하는경우



        HttpSession session = request.getSession();
        session.setAttribute(errorMessage, exception);

        redirectStrategy.sendRedirect(request, response,"/signup");

    }
}
