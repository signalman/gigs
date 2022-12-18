package gigsproject.gigs.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProposalForm {

    private Long postId;
    private Long starId;
    private String content;
}
