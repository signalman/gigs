package gigsproject.gigs.service;

import gigsproject.gigs.domain.*;
import gigsproject.gigs.repository.HostRepository;
import gigsproject.gigs.repository.PostRepository;
import gigsproject.gigs.request.PostSave;
import gigsproject.gigs.request.StageSearch;
import gigsproject.gigs.response.HostResponse;
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

    private final HostRepository hostRepository;
    private final PostRepository postRepository;

    /**포스트 등록
     * @param postSave
     */
    @Transactional
    public void write(PostSave postSave) {

        Host host = hostRepository.findById(postSave.getHost().getHostId())
                .orElseThrow(() -> new IllegalArgumentException("해당 호스트가 존재하지 않습니다."));
        Post post = host.createPost(postSave);
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


    public HostResponse findHost(Long hostId) {
        Host host = hostRepository.findById(hostId)
                .orElseThrow(() -> new IllegalArgumentException("해당 호스트가 존재하지 않습니다."));
        HostResponse hostResponse = new HostResponse(host);

        return hostResponse;
    }

}
