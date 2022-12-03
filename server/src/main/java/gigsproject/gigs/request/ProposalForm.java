package gigsproject.gigs.request;

import lombok.Data;

@Data
public class ProposalForm {

    private Long postId;
    private Long starId;
    private String content;
}
