package gigsproject.gigs.domain;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

public enum StageType {
    CAFE,
    BAR,
    RESTAURANT,
    SCHOOL,
}
