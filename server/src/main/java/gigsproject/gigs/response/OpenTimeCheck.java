package gigsproject.gigs.response;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Target({ElementType.METHOD, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Constraint(validatedBy = OpenTimeValidator.class)
public @interface OpenTimeCheck {

    String message() default "post open time validation check";

    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};

}
