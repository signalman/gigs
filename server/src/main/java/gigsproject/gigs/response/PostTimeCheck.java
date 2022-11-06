package gigsproject.gigs.response;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Target({ElementType.METHOD, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Constraint(validatedBy = PostTimeValidator.class)
public @interface PostTimeCheck {

    String message() default "post time validation check";

    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};

}
