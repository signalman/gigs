package gigsproject.gigs.config;

import gigsproject.gigs.config.oauth.OAuth2AuthenticationSuccessHandler;
import gigsproject.gigs.config.oauth.OAuth2UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;


@EnableWebSecurity
@Configuration
public class SecurityConfig{
    @Autowired
    private OAuth2UserService oauth2userService;

    @Autowired
    private OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;
    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors().configurationSource(request -> new CorsConfiguration().applyPermitDefaultValues());
        return http
                .csrf().disable()
                .authorizeRequests()
                .antMatchers(HttpMethod.OPTIONS).permitAll().and()
                .oauth2Login()
                .successHandler(oAuth2AuthenticationSuccessHandler)
                .defaultSuccessUrl("http://localhost:3000")
                .userInfoEndpoint()
                .userService(oauth2userService)
                .and()
                .and().build();
    }

}
