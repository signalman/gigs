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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hostId")
    private Host host;

    private LocalDate date;
    private LocalTime startTime;
    private LocalTime endTime;


    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    @Builder.Default
    private List<PostGenre> postGenres = new ArrayList<>();

    @OneToMany(mappedBy = "post")
    @Builder.Default
    private List<Proposal> proposals = new ArrayList<>();

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private PostStatus status;

    public void setHost(Host host) {
        this.host = host;
        host.getPosts().add(this);
    }

    public void setPostGenres(PostGenre genre) {
        postGenres.add(genre);
        genre.setPost(this);
    }
    public void setStatus(PostStatus ps) {
        this.status = ps;
    }
}

