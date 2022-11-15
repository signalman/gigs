package gigsproject.gigs.domain;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Proposal {
    @Id
    @GeneratedValue
    private Long proposalId;

    private Boolean type; //true: 스타->호스트   false: 호스트 -> 스타    현재는 스타->호스트만 구현한다.

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "hostId")
    private Host host;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "starId")
    private Star star;

    private LocalDateTime createdAt;

    @Lob
    private String content;

    private LocalDateTime showStartTime;
    private LocalDateTime showEndTime;

    @Enumerated(EnumType.STRING)
    private ShowStatus showStatus;
}
