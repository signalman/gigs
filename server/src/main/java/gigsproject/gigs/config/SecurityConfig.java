package gigsproject.gigs.config;

//import gigsproject.gigs.config.oauth.OAuth2AuthenticationFailureHandler;
import gigsproject.gigs.config.oauth.OAuth2AuthenticationFailureHandler;
import gigsproject.gigs.config.oauth.OAuth2AuthenticationSuccessHandler;
import gigsproject.gigs.config.oauth.OAuth2UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.web.cors.CorsConfiguration;


@EnableWebSecurity
@Configuration
public class SecurityConfig{
    @Autowired
    private OAuth2UserService oauth2userService;

    @Autowired
    private OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;

    @Autowired
    private OAuth2AuthenticationFailureHandler oAuth2AuthenticationFailureHandler;
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
