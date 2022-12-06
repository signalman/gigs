package gigsproject.gigs.service;

import gigsproject.gigs.domain.Host;
import gigsproject.gigs.domain.Post;
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
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class HostService {

    private final HostRepository hostRepository;
    private final PostRepository postRepository;
    private final AwsS3Service awsS3Service;

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

    @Transactional
    public void delete(User user) {
        StageForm stageForm = StageForm.builder()
                .build();

        Host host = findByUser(user);
        host.edit(stageForm);

        List<Post> posts = host.getPosts();
        postRepository.deleteAll(posts);
    }

    @Transactional
    public String editRepImg(User user, MultipartFile repImg) {
        Host host = findByUser(user);
        String repImgUrl = host.getRepImg();
        if (!repImgUrl.equals("")) {
            awsS3Service.deleteImage(repImgUrl);
        }
        String newRepImgUrl = awsS3Service.uploadImage(repImg);
        host.setRepImg(newRepImgUrl);
        log.info("****대표 이미지 수정 완료 : {}", newRepImgUrl);
        return newRepImgUrl;
    }

    @Transactional
    public Map<Long, String> uploadImgs(User user, List<MultipartFile> multipartFileList) {
        Host host = findByUser(user);

        List<String> strings = awsS3Service.uploadImages(multipartFileList);
        //host.imgs 에 추가
        Map<Long, String> imgUrlMap = new HashMap<>();

        return imgUrlMap;
    }
}
