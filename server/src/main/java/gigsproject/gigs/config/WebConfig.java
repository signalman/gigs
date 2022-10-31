package gigsproject.gigs.config;

import gigsproject.gigs.request.StringToEnumConverter;
import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addFormatters(FormatterRegistry registry) {
        registry.addConverter(new StringToEnumConverter.StringToStageTypeConverter());
        registry.addConverter(new StringToEnumConverter.StringToGenderConverter());
        registry.addConverter(new StringToEnumConverter.StringToGenreConverter());
    }
}
