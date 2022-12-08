package gigsproject.gigs.request;

import gigsproject.gigs.domain.Genre;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;


@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class PostForm {

    private Genre genre;
    private LocalDate date;

    private LocalTime startTime;
    private LocalTime endTime;


}
