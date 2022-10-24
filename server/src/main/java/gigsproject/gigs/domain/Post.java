package gigsproject.gigs.domain;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Builder
@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class Post {
    @Id @GeneratedValue
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL) @JoinColumn(name = "hostId")
    private Host host;
    //-- 연관관계 편의 메서드 --//
    public void setHost(Host host) {
        this.host = host;
        host.getPosts().add(this);
    }

    private LocalDateTime showStartTime;

    private LocalDateTime showEndTime;

}
