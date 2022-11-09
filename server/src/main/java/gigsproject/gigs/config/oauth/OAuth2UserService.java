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

        log.info("userRequest: {}", userRequest);
        log.info("토큰 밸류{}", userRequest.getAccessToken().getTokenValue());
        log.info("토큰 스코프{}", userRequest.getAccessToken().getScopes());
        log.info("토큰 타입{}", userRequest.getAccessToken().getTokenType());
        log.info("토큰 expiresat{}", userRequest.getAccessToken().getExpiresAt());
        log.info("issued At : {}", userRequest.getAccessToken().getIssuedAt());
        log.info("{}", userRequest.getClientRegistration());
        log.info("{}", userRequest.getAdditionalParameters());

        OAuth2User oAuth2User = super.loadUser(userRequest);
        String uid = oAuth2User.getAttribute("id").toString();
        log.info("유저객체 {}", oAuth2User);
        log.info("권한 {}", oAuth2User.getAuthorities());
        log.info("이름 {}", oAuth2User.getName());
        log.info("속성 {}", oAuth2User.getAttributes());


        Map<String, Object> properties = (Map<String, Object>) oAuth2User.getAttributes().get("properties");
        log.info("properites: {}", properties);
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
