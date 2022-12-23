package gigsproject.gigs.domain;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Proposal {
    @Id
    @GeneratedValue
    private Long proposalId;

    //true: 스타->호스트   false: 호스트 -> 스타    현재는 스타->호스트만 구현한다.
//    private Boolean type;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "postId")
    private Post post;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "starId")
    private Star star;

    private LocalDateTime createdAt;

    @Lob
    private String content;

    private LocalDateTime showStartTime;
    private LocalDateTime showEndTime;

    @Enumerated(EnumType.STRING)
    private ShowStatus showStatus;

    @OneToOne(mappedBy = "proposal")
    private Review review;

    public void setStar(Star star) {
        this.star = star;
        star.getProposals().add(this);
    }

    public void setPost(Post post) {
        this.post = post;
        post.getProposals().add(this);
    }

    public ShowStatus editStatus(String status) {
        String s = status.toUpperCase();
        this.showStatus = ShowStatus.valueOf(s);
        return showStatus;
    }
}
