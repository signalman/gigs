package gigsproject.gigs.domain;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static javax.persistence.CascadeType.ALL;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Proposal extends BaseTimeEntity{
    @Id
    @GeneratedValue
    private Long proposalId;

    //true: 스타->호스트   false: 호스트 -> 스타    현재는 스타->호스트만 구현한다.
//    private Boolean type;

    @ManyToOne(fetch = FetchType.LAZY, cascade = ALL)
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

    @OneToMany(mappedBy = "proposal")
    private List<Review> reviews = new ArrayList<>();

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
