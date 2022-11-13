package gigsproject.gigs.response;

import lombok.extern.slf4j.Slf4j;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.time.LocalTime;

/**
 * Post 등록 시 호스트의 오픈 ~ 마감 시간 내로 등록하는 지에 대한 Validator
 */
@Slf4j
public class OpenTimeValidator implements ConstraintValidator<OpenTimeCheck, LocalTime> {

    @Override
    public boolean isValid(LocalTime value, ConstraintValidatorContext context) {

        return false;
    }
}
