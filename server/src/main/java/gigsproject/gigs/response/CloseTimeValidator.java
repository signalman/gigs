package gigsproject.gigs.response;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.time.LocalTime;

public class CloseTimeValidator implements ConstraintValidator<CloseTimeCheck, LocalTime> {

    @Override
    public boolean isValid(LocalTime value, ConstraintValidatorContext context) {
        return false;
    }
}
