package gigsproject.gigs.request;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import javax.validation.constraints.FutureOrPresent;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@RequiredArgsConstructor
public class PostSave {
    @NotBlank(message = "공연 시작 시간을 입력해주세요.") @FutureOrPresent(message = "과거 시간은 입력할 수 없습니다.")
    private LocalDateTime startTime;
    @NotBlank(message = "공연 끝 시간을 입력해주세요.") @FutureOrPresent(message = "과거 시간은 입력할 수 없습니다.")
    private LocalDateTime endTime;
}
