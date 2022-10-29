package gigsproject.gigs.request;

import gigsproject.gigs.domain.Gender;
import gigsproject.gigs.domain.Genre;
import gigsproject.gigs.domain.StageType;
import org.springframework.core.convert.converter.Converter;

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