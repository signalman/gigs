package gigsproject.gigs.domain;

import lombok.*;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class PostGenre {
    @Id @GeneratedValue
    private Long postGenreId;

    @Enumerated(EnumType.STRING)
    private Genre genre;

    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "postId")
    private Post post;
    public void setPost(Post post) {
        this.post = post;
        post.getPostGenres().add(this);
    }

}
