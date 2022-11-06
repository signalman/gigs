package gigsproject.gigs.service;

import gigsproject.gigs.domain.Genre;
import gigsproject.gigs.domain.Post;
import gigsproject.gigs.domain.StageType;
import gigsproject.gigs.domain.Star;
import gigsproject.gigs.repository.PostRepository;
import gigsproject.gigs.request.PostSave;
import gigsproject.gigs.request.StageSearch;
import gigsproject.gigs.response.StageCard;
import gigsproject.gigs.response.StarCard;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class PostService {

    private final PostRepository postRepository;

    /**포스트 등록
     * @param postSave
     */
    @Transactional
    public void write(PostSave postSave) {

        Post post = Post.builder().build();

        //PostGenre에 대한 필요성?? Genre 하나 Enum으로 사용하는 건?
//        post.getPostGenres().add()
        postRepository.save(post);
    }


    /**
     * 무대 찾기 서비스
     * @param stageSearch
     * @param pageable
     * @return
     */
    public Page<StageCard> getList(StageSearch stageSearch, Pageable pageable) {
        return postRepository.getList(stageSearch, pageable);
    }


}
