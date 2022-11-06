package gigsproject.gigs.request;

import gigsproject.gigs.domain.Genre;
import lombok.*;

import javax.validation.constraints.FutureOrPresent;
import javax.validation.constraints.NotBlank;
import java.time.LocalDate;
import java.time.LocalTime;


@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class PostSave {

//    @NotBlank  host 정보 프론트에서 받아와야 할듯
//    private Host host;

    @NotBlank(message = "원하는 장르를 입력해주세요.")
    private Genre genre;

    @NotBlank(message = "공연 시작 날짜를 입력해주세요.")@FutureOrPresent(message = "과거 시간은 입력할 수 없습니다.")
    private LocalDate startDate;
    @NotBlank(message = "공연 끝 날짜를 입력해주세요.") @FutureOrPresent(message = "과거 시간은 입력할 수 없습니다.")
    private LocalDate endDate;

    @NotBlank(message = "공연 끝 시간을 입력해주세요.")
//    @PostTimeCheck
    private LocalTime startTime;
    @NotBlank(message = "공연 끝 시간을 입력해주세요.")
//    @PostTimeCheck
    private LocalTime endTime;
}
