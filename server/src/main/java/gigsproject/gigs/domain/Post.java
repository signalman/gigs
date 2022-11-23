package gigsproject.gigs.domain;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Builder
@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class Post extends BaseTimeEntity {
    @Id
    @GeneratedValue
    private Long postId;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "hostId")
    private Host host;

    private LocalDate date;
    private LocalTime startTime;
    private LocalTime endTime;


    @OneToMany(mappedBy = "post")
    @Builder.Default
    private List<PostGenre> postGenres = new ArrayList<>();

    @OneToMany(mappedBy = "post")
    @Builder.Default
    private List<Proposal> proposals = new ArrayList<>();

    public void setHost(Host host) {
        this.host = host;
        host.getPosts().add(this);
    }

    public void setPostGenres(PostGenre genre) {
        postGenres.add(genre);
        genre.setPost(this);
    }


}
