package gigsproject.gigs.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import gigsproject.gigs.response.KakaoProfile;
import gigsproject.gigs.response.OAuthTokenKakao;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.stereotype.Controller;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.*;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Controller
@Slf4j
public class UserController {
    /**
     *
     * 토큰 받기
     * grant_type
     * cilent_id
     * redirect_uri
     * code
     *
     */
    @GetMapping("/auth/kakao")
    public void kakaoLogin(@RequestParam String code, HttpServletResponse httpResponse) throws IOException {

        //코드 -> 카카오
        //카카오 토큰
        //토큰 쿠키 ->클라

        //post방식으로 key = value 데이터를 요청(카카오쪽으로)
        /**
         * 코드 보내고 토큰 받기.
         */
        RestTemplate rt = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", "1a48f313adc5d008b145632d29aa68df");
        params.add("redirect_uri", "http://localhost:8080/auth/kakao");
        params.add("code", code);

        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest =
                new HttpEntity<>(params, headers);

        ResponseEntity<String> response = rt.exchange(
                "https://kauth.kakao.com/oauth/token",
                HttpMethod.POST,
                kakaoTokenRequest,
                String.class
        );

        ObjectMapper objectMapper = new ObjectMapper();
        OAuthTokenKakao oauthTokenKakao = objectMapper.readValue(response.getBody(), OAuthTokenKakao.class);

        //============================================================

        /**
         * 유저 정보 받기.
         */
        RestTemplate rt2 = new RestTemplate();
        HttpHeaders headers2 = new HttpHeaders();
        headers2.add("Authorization", "Bearer " + oauthTokenKakao.getAccess_token());
        headers2.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        HttpEntity<MultiValueMap<String, String>> kakaoProfileRequest2 = new HttpEntity<>(headers2);

        ResponseEntity<String> response2 = rt2.exchange(
                "https://kapi.kakao.com/v2/user/me",
                HttpMethod.POST,
                kakaoProfileRequest2,
                String.class
        );
        log.info("response2.getbody(): {}", response2.getBody());

        ObjectMapper objectMapper1 = new ObjectMapper();
        KakaoProfile kakaoProfile = objectMapper1.readValue(response2.getBody(), KakaoProfile.class);

        Cookie cookie = new Cookie("id", kakaoProfile.getId().toString());
        Cookie cookie1 = new Cookie("name", URLEncoder.encode(kakaoProfile.getProperties().nickname, StandardCharsets.UTF_8));
        log.info("{}", cookie1.getName());
        cookie.setMaxAge(1000);
        cookie1.setMaxAge(1000);

        httpResponse.sendRedirect("http://localhost:3000/signup");
        httpResponse.addCookie(cookie);
        httpResponse.addCookie(cookie1);

    }
}
