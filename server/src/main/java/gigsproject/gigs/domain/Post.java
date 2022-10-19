package gigsproject.gigs.domain;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Post {
    @Id @GeneratedValue
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "hostId")
    private Host host;

    private LocalDateTime showStartTime;

    private LocalDateTime showEndTime;

    //-- 연관관계 편의 메서드 --//
    /**
     * 삭제 예정 주석
     * @param host
     * 다대일 관계에서 일 쪽에 연관관계 편의 메서드를 만들려고 하니 setter를 열어줘야 해서
     * 일단 다 쪽에 만들었습니다.
     */
    public void setHost(Host host) {
        this.host = host;
        host.getPosts().add(this);
    }

}
