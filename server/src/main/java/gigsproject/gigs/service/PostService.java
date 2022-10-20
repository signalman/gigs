package gigsproject.gigs.service;

import gigsproject.gigs.domain.Host;
import gigsproject.gigs.domain.Post;
import gigsproject.gigs.repository.HostRepository;
import gigsproject.gigs.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PostService {

    private final HostRepository hostRepository;
    private final PostRepository postRepository;

    /**
     * @param name
     * @return get(0)은 검색되는 hostname이 하나밖에 없다는 전제 하에 가능, 추후 수정 예정
     */
    public List<Post> getListByName(String name) {
        List<Host> hostList = hostRepository.findByStageName(name);

        return postRepository.findByHost(hostList.get(0));
    }
}
