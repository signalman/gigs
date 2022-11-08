package gigsproject.gigs.config;

//import gigsproject.gigs.config.oauth.OAuth2AuthenticationFailureHandler;

import gigsproject.gigs.config.oauth.OAuth2AuthenticationFailureHandler;
import gigsproject.gigs.config.oauth.OAuth2AuthenticationSuccessHandler;
import gigsproject.gigs.config.oauth.OAuth2UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;


@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig{
    private final OAuth2UserService oauth2userService;
    private final OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;
    private final OAuth2AuthenticationFailureHandler oAuth2AuthenticationFailureHandler;
    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors().configurationSource(request -> new CorsConfiguration().applyPermitDefaultValues());
        return http
                .csrf().disable()
                .authorizeRequests()
                .antMatchers(HttpMethod.OPTIONS).permitAll().and()
                .oauth2Login()
                    .userInfoEndpoint()
                    .userService(oauth2userService)
                .and()
                    .successHandler(oAuth2AuthenticationSuccessHandler)
                    .failureHandler(oAuth2AuthenticationFailureHandler)
                .and()
                .build();
    }

}
