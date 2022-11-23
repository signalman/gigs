package gigsproject.gigs.controller;

import gigsproject.gigs.response.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.BindException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;

@Slf4j
@RestControllerAdvice
public class ExceptionController {

    /**
     * javax.validation.Valid or @Validated 으로 binding error 발생시 발생한다.
     * HttpMessageConverter 에서 등록한 HttpMessageConverter binding 못할경우 발생
     * 주로 @RequestBody, @RequestPart 어노테이션에서 발생
     */
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ErrorResponse methodArgumentNotValidExceptionHandler(MethodArgumentNotValidException e) {

        ErrorResponse errorResponse = ErrorResponse.builder()
                .statusCode("400")
                .message("잘못된 요청입니다.")
                .build();

        List<FieldError> fieldErrors = e.getFieldErrors();

        for (FieldError fieldError : fieldErrors) {
            errorResponse.addValidation(fieldError.getField(), fieldError.getDefaultMessage());
        }

        return errorResponse;
    }

    /**
     * @ModelAttribut 으로 binding error 발생시 BindException 발생한다.
     * ref https://docs.spring.io/spring/docs/current/spring-framework-reference/web.html#mvc-ann-modelattrib-method-args
     */
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(BindException.class)
    protected ErrorResponse bindExceptionHandler(BindException e) {

        ErrorResponse errorResponse = ErrorResponse.builder()
                .statusCode("400")
                .message("잘못된 요청입니다.")
                .build();

        List<FieldError> fieldErrors = e.getFieldErrors();

        for (FieldError fieldError : fieldErrors) {
            errorResponse.addValidation(fieldError.getField(), fieldError.getDefaultMessage());
        }

        return errorResponse;
    }

    /**
     * Authentication 객체가 필요한 권한을 보유하지 않은 경우 발생합
     */
    @ResponseStatus(HttpStatus.FORBIDDEN)
    @ExceptionHandler(AccessDeniedException.class)
    protected ErrorResponse accessDeniedExceptionHandler(AccessDeniedException e) {

        ErrorResponse errorResponse = ErrorResponse.builder()
                .message("액세스가 거부되었습니다.")
                .statusCode("403")
                .build();

        return errorResponse;
    }

    /**
     * 그외 에러들 (발견되면 처리 필요)
     */
    @ExceptionHandler(Exception.class)
    protected ErrorResponse exceptionHandler(Exception e) {
        log.error("handleEntityNotFoundException : {}" , e.getMessage());
        ErrorResponse errorResponse = ErrorResponse.builder()
                .message(e.getMessage())
                .statusCode("500")
                .build();

        errorResponse.addValidation("500", "Internal Server Error");

        return errorResponse;
    }
}
