package gigsproject.gigs.request;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@RequiredArgsConstructor
@Getter
@Setter
public class ReviewForm {

    private Long proposalId;
    private String content;
    private Integer score;

}
