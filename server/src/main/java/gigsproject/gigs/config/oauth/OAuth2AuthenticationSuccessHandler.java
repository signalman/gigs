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

        //todo
        /**
         * 여기서 바로 클라 홈으로 리다이렉트 시키는 것보다 중간 페이지를 두고 거기서 쿠키로 보내주는 것이 더 좋아보임.
         */

//        response.sendRedirect("http://localhost:3000");

        response.sendRedirect("http://localhost:3000/wait");

        /**
         *
         * server 쪽으로 /wait
         *
         * 서버쪽에서 응답에 쿠키 내려줌.
         * 서버쪽에서 redirect:/
         *
         *
         *
         */

    }
}


