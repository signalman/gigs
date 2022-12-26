package gigsproject.gigs.response;

import gigsproject.gigs.domain.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Objects;

@Data
//상대방으로부터 어떤 포스트인지는 상관없이 그냥 이 무대에대한 리뷰
public class ReviewDto {

    private Long reviewId;

    /**
     * 작성자 정보
     */
    private Long fromRoleId; //리뷰작성자의 호스트 or 스타 id
    private String fromRole;
    private String fromName;
    private String fromRepImg;

    /**
     * 대상자 정보
     */
    private Long toRoleId; //리뷰 대상자의 호스트 or 스타 id
    private String toRole;
    private String toName;
    private String toRepImg;
    /**
     * 리뷰 정보
     */
    private String content; // 작성자가 쓴 내용
    private Double score;
    private LocalDateTime createdAt;



    public ReviewDto(Review review) {
        this.reviewId = review.getReviewId();
        Host host = review.getProposal().getPost().getHost();
        Star star = review.getProposal().getStar();

        //작성자, 작성 대상 판단
        if (Objects.equals(host.getUser().getUserId(), review.getUser().getUserId())) {
            fromRoleId = host.getHostId();
            fromRole = Role.ROLE_HOST.toString().toLowerCase();
            fromName = host.getStageName();
            fromRepImg = host.getRepImg();

            toRoleId = star.getStarId();
            toRole = Role.ROLE_STAR.toString().toLowerCase();
            toName = star.getName();
            toRepImg = star.getRepImg();

        } else {
            fromRoleId = star.getStarId();
            fromRole = Role.ROLE_STAR.toString().toLowerCase();
            fromName = star.getName();
            fromRepImg = star.getRepImg();

            toRoleId = host.getHostId();
            toRole = Role.ROLE_HOST.toString().toLowerCase();
            toName = host.getStageName();
            toRepImg = host.getRepImg();
        }

        this.content = review.getContent();
        this.createdAt = review.getModifiedDate();
        this.score = review.getScore();
    }
}
