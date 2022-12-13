package gigsproject.gigs.response;

import gigsproject.gigs.domain.Host;
import gigsproject.gigs.domain.Post;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

import static java.util.Objects.isNull;

@Data
public class PostFormRes {
    private String name;
    private String repImg;
    private List<PostResponse> posts;

    public PostFormRes(Host host, List<Post> posts) {
        this.name = host.getStageName();
        this.repImg = isNull(host.getRepImg()) ? "" : host.getRepImg();
        this.posts = posts.stream().map(p -> new PostResponse(p)).collect(Collectors.toList());
    }
}
