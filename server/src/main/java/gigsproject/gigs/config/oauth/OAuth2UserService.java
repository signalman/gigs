package gigsproject.gigs.config.oauth;


import gigsproject.gigs.domain.User;
import gigsproject.gigs.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.util.Map;

import static java.util.Objects.*;
import static java.util.UUID.randomUUID;

@Slf4j
@RequiredArgsConstructor
@Service
public class OAuth2UserService extends DefaultOAuth2UserService { //return 한 객체가 시큐리티 세션에 저장됨.

    private final UserRepository userRepository;
    private final HttpSession session;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        OAuth2User oAuth2User = super.loadUser(userRequest);
        String regClient = userRequest.getClientRegistration().getClientName();
        String uid = regClient + oAuth2User.getAttribute("id").toString();

        Map<String, Object> properties = (Map<String, Object>) oAuth2User.getAttributes().get("properties");
        String name = (String) properties.get("nickname");

        User findUser = userRepository.findByUid(uid);

        if(isNull(findUser)){ //회원가입 안한 사용자.
            String UUID = randomUUID().toString();
            session.setAttribute("uuid", UUID);
            NotSignedUser notSignedUser = new NotSignedUser(uid, UUID, name);
            session.setAttribute(UUID, notSignedUser);
            throw new InternalAuthenticationServiceException(name + "님은 회원가입을 하지 않으셨습니다.");
        }
        session.setAttribute("user", new SessionUser(findUser));
        return oAuth2User;
    }
}
