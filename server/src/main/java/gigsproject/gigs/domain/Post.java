package gigsproject.gigs.domain;

import gigsproject.gigs.request.PostForm;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import static gigsproject.gigs.domain.PostStatus.UNSIGNED;
import static javax.persistence.CascadeType.ALL;

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


    @OneToMany(mappedBy = "post", cascade = ALL)
    @Builder.Default
    private List<PostGenre> postGenres = new ArrayList<>();

    @OneToMany(mappedBy = "post", cascade = ALL)
    @Builder.Default
    private List<Proposal> proposals = new ArrayList<>();

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private PostStatus status;

    public static Post createPost(PostForm postForm, Host host) {
        Post post = Post.builder()
                .date(postForm.getDate())
                .startTime(postForm.getStartTime())
                .endTime(postForm.getEndTime())
                .status(UNSIGNED)
                .build();
        post.setHost(host);
        PostGenre postGenre = PostGenre.builder()
                .genre(postForm.getGenre())
                .build();
        post.setPostGenres(postGenre);

        return post;
    }

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

