package gigsproject.gigs.response;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Builder
@Getter
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class ErrorResponse {

    private final String statusCode;
    private final String message;
    private final Map<String, String> fieldErrors = new HashMap<>();
    private final LocalDateTime timestamp = LocalDateTime.now();

    public void addValidation(String field, String defaultMessage) {
        fieldErrors.put(field, defaultMessage);
    }
}
