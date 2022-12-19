package gigsproject.gigs.service;

import gigsproject.gigs.domain.*;
import gigsproject.gigs.repository.HostRepository;
import gigsproject.gigs.repository.PostRepository;
import gigsproject.gigs.request.PostForm;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import static gigsproject.gigs.domain.PostStatus.UNSIGNED;
import static gigsproject.gigs.domain.ShowStatus.SIGNED;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class PostService {

    private final HostRepository hostRepository;
    private final PostRepository postRepository;

    /**
     * 포스트 등록
     */
    @Transactional
    public Long write(User user, PostForm postForm) {
        Host host = hostRepository.findByUser(user);

        if (!isPostDuplicate(postForm, host)) {
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

            Post save = postRepository.save(post);

            return save.getPostId();
        }
        throw new RuntimeException("해당 포스트는 이미 존재합니다.");
    }

    private static boolean isPostDuplicate(PostForm postForm, Host host) {
        List<Post> posts = host.getPosts();
        for (Post post : posts) {
            LocalDate requestDate = postForm.getDate();
            LocalTime requestStartTime = postForm.getStartTime();
            LocalTime requestEndTime = postForm.getEndTime();

            if (requestDate.equals(post.getDate())
                    && requestStartTime.equals(post.getStartTime())
                    && requestEndTime.equals(post.getEndTime())
            ) {
                Genre requestGenre = postForm.getGenre();
                List<PostGenre> postGenres = post.getPostGenres();
                for (PostGenre postGenre : postGenres) {
                    if(requestGenre == postGenre.getGenre())
                        return true;
                }
            }

        }
        return false;
    }

    @Transactional
    public void delete(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 포스트가 존재하지 않습니다."));

        postRepository.delete(post);

    }

    public Post findById(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 포스트가 존재하지 않습니다."));
        return post;
    }

    @Transactional
    public void setPostStatus(Long postId, ShowStatus changedStatus) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("해당 포스트가 존재하지 않습니다."));
        if (changedStatus == ShowStatus.SIGNED || changedStatus == ShowStatus.COMP)
            post.setStatus(PostStatus.SIGNED);

        log.info("post status : {}", post.getStatus());
    }

}
