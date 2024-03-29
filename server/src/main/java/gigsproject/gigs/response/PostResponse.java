package gigsproject.gigs.response;

import gigsproject.gigs.domain.Post;
import gigsproject.gigs.domain.PostStatus;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

import static java.util.Objects.isNull;

@Data
public class PostResponse {

    private Long postId;
    private Long hostId;

    private LocalDate date;
    private LocalTime startTime;
    private LocalTime endTime;

    private PostStatus status;

    private List<PostGenreDto> postGenres;


    public PostResponse(Post post) {
        postId = post.getPostId();
        hostId = post.getHost().getHostId();
        date = post.getDate();
        startTime = post.getStartTime();
        endTime = post.getEndTime();
        status = post.getStatus();
        this.postGenres = isNull(post.getPostGenres())? List.of() : post.getPostGenres().stream()
                .map(postGenre -> new PostGenreDto(postGenre))
                .collect(Collectors.toList());
    }
}
