package gigsproject.gigs.service;

import gigsproject.gigs.domain.Host;
import gigsproject.gigs.domain.User;
import gigsproject.gigs.repository.HostRepository;
import gigsproject.gigs.repository.PostRepository;
import gigsproject.gigs.request.StageForm;
import gigsproject.gigs.request.StageSearch;
import gigsproject.gigs.response.HostResponse;
import gigsproject.gigs.response.StageCard;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class HostService {

    private final HostRepository hostRepository;
    private final PostRepository postRepository;
    private final EntityManager em;


    /**
     * 무대 찾기 서비스
     *
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

    public Host findByUser(User user) {
        return hostRepository.findByUser(user);
    }

    @Transactional
    public Long edit(User user, StageForm stageForm) {
        Host host = findByUser(user);
        Host edit = host.edit(stageForm);
        return edit.getHostId();
    }

    public Long delete(User user) {
        StageForm stageForm = StageForm.builder()
                .build();
        return edit(user, stageForm);
    }
}
