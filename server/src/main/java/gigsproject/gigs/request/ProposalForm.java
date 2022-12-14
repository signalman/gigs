package gigsproject.gigs.request;

import lombok.Data;

@Data
public class ProposalForm {

    private final Long postId;
    private final Long starId;
    private final String content;
}
