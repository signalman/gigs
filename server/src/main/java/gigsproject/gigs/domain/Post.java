package gigsproject.gigs.domain;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Builder
@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class Post extends BaseTimeEntity{
    @Id @GeneratedValue
    private Long postId;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL) @JoinColumn(name = "hostId")
    private Host host;

    private LocalDate startDate;
    private LocalDate endDate;
    private LocalTime startTime;
    private LocalTime endTime;


    @OneToMany(mappedBy = "post") @Builder.Default
    private List<PostGenre> postGenres = new ArrayList<>();


    public void setHost(Host host) {
        this.host = host;
        host.getPosts().add(this);
    }




}
