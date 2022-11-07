package gigsproject.gigs.config.oauth;


import com.nimbusds.oauth2.sdk.http.HTTPEndpoint;
import gigsproject.gigs.domain.User;
import gigsproject.gigs.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpCookie;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticatedPrincipal;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.util.Collections;
import java.util.Map;

import static java.util.Objects.*;

@Slf4j
@RequiredArgsConstructor
@Service
public class OAuth2UserService extends DefaultOAuth2UserService { //return 한 객체가 시큐리티 세션에 저장됨.

    private final UserRepository userRepository;
    private final HttpSession session;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        OAuth2User oAuth2User = super.loadUser(userRequest);
        String uid = oAuth2User.getAttribute("id").toString();

        Map<String, Object> properties = (Map<String, Object>) oAuth2User.getAttributes().get("properties");
        String name = (String) properties.get("nickname");

        User findUser = userRepository.findByUid(uid);

        if(isNull(findUser)){ //회원가입 안한 사용자.
            session.setAttribute("id", uid);
            session.setAttribute("name", name);
            throw new InternalAuthenticationServiceException(name + "님은 회원가입을 하지 않으셨습니다.");
        }
        session.setAttribute("user", new SessionUser(findUser));
        return oAuth2User;
    }
}
