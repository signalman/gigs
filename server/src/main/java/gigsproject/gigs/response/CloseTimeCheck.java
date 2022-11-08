package gigsproject.gigs.response;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Target({ElementType.METHOD, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Constraint(validatedBy = CloseTimeValidator.class)
public @interface CloseTimeCheck {

    String message() default "post close time validation check";

    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
