package gigsproject.gigs.response;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class ProposalResponse {
    private Long starId;
    private Long postId;
    private String starImg;
    private String starName;
    private String stageName;
    private LocalDate date;
    private LocalTime startTime;
    private LocalTime endTime;

    public ProposalResponse(Long starId, Long postId, String starImg, String starName, String stageName, LocalDate date, LocalTime showStartTime, LocalTime showEndTime) {
        this.starId = starId;
        this.postId = postId;
        this.starImg = starImg;
        this.starName = starName;
        this.stageName = stageName;
        this.date = date;
        this.startTime = showStartTime;
        this.endTime = showEndTime;
    }
}
