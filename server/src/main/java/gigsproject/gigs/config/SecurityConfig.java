package gigsproject.gigs.config;

import gigsproject.gigs.config.oauth.OAuth2AuthenticationSuccessHandler;
import gigsproject.gigs.config.oauth.UserOAuth2Service;
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
    private UserOAuth2Service userOAuth2Service;

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
//                .loginPage("http://localhost:3000")
//                .defaultSuccessUrl("/login-success")
//                .successHandler(oAuth2AuthenticationSuccessHandler)
//                .failureUrl("/stars")
//                .userInfoEndpoint()
//                .userService(userOAuth2Service)
//                .and()
                .and().build();
    }

}
