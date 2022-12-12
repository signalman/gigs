package gigsproject.gigs.service;

import gigsproject.gigs.domain.*;
import gigsproject.gigs.repository.HostRepository;
import gigsproject.gigs.repository.PostRepository;
import gigsproject.gigs.request.PostForm;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static gigsproject.gigs.domain.PostStatus.UNSIGNED;

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

        Post post = Post.createPost(postForm, host);
        Post save = postRepository.save(post);

        return save.getPostId();
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
    public void setPostSigned(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("해당 포스트가 존재하지 않습니다."));
        post.setStatus(PostStatus.SIGNED);
    }

}
