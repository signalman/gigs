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
        return http
                .csrf().disable()
                .cors().configurationSource(request -> new CorsConfiguration().applyPermitDefaultValues())
                .and()
                .authorizeRequests()
                .antMatchers("/mypage/**").authenticated()
                .antMatchers("/posts/**").access("hasRole('ROLE_HOST')")
                .anyRequest().permitAll()
                .and()
                .oauth2Login()
                    .userInfoEndpoint()
                    .userService(oauth2userService)
                .and()
                    .successHandler(oAuth2AuthenticationSuccessHandler)
                    .failureHandler(oAuth2AuthenticationFailureHandler)
                .and()
                    .logout()
                .and()
                .build();
    }

}
