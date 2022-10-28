package gigsproject.gigs.request;

import gigsproject.gigs.domain.Gender;
import gigsproject.gigs.domain.Genre;
import gigsproject.gigs.domain.StageType;
import org.springframework.core.convert.converter.Converter;

/**
 * https://velog.io/@max9106/Spring-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EB%B0%94%EC%9D%B8%EB%94%A9-Converter-Fomatter-2rk5wg6ygq
 */
public class StringToEnumConverter{

    public static class StringToGenderConverter implements Converter<String, Gender> {
        @Override
        public Gender convert(String source) {
            return Gender.valueOf(source.toUpperCase());
        }
    }
    public static class StringToStageTypeConverter implements Converter<String, StageType> {
        @Override
        public StageType convert(String source) {
            return StageType.valueOf(source.toUpperCase());
        }
    }
    public static class StringToGenreConverter implements Converter<String, Genre> {
        @Override
        public Genre convert(String source) {
            return Genre.valueOf(source.toUpperCase());
        }
    }


}