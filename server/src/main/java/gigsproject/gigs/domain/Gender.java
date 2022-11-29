package gigsproject.gigs.domain;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum Gender {
    WOMEN,
    MEN,
    MIXED,
    ALL,
    DEFAULT;

    @JsonCreator
    public static Gender forValue(String value) {

        for (Gender gender : Gender.values()) {
            if (gender.name().equals(value)) {
                return gender;
            }
        }
        return null;

    }
}
