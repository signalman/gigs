package gigsproject.gigs.service;

import gigsproject.gigs.domain.*;
import gigsproject.gigs.repository.HostRepository;
import gigsproject.gigs.repository.PostRepository;
import gigsproject.gigs.repository.StageImgRepository;
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

import java.util.List;

import static java.util.Objects.isNull;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class HostService {

    private final HostRepository hostRepository;
    private final PostRepository postRepository;
    private final AwsS3Service awsS3Service;
    private final StageImgRepository stageImgRepository;

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

    public HostResponse findByHost(Long hostId) {
        Host host = hostRepository.findById(hostId)
                .orElseThrow(() -> new IllegalArgumentException("해당 호스트가 존재하지 않습니다."));
        return new HostResponse(host);
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

    //대표 이미지를 따로 등록하는 것 vs 업로드한 이미지 중에 대표이미지를 선택하는 것
    //후자면 로직 변경 필요
    @Transactional
    public String editRepImg(User user, MultipartFile repImg) {
        Host host = findByUser(user);
        String repImgUrl = host.getRepImg();
        if (!repImgUrl.equals("")) {
            awsS3Service.deleteImage(repImgUrl);
        }
        String newRepImgUrl = awsS3Service.uploadImage(repImg);

        host.setRepImg(newRepImgUrl);

        return newRepImgUrl;
    }

//    @Transactional
//    public List<StageImgDto> uploadImgs(User user, List<MultipartFile> multipartFileList) {
//        Host host = findByUser(user);
//        List<String> files = awsS3Service.uploadImages(multipartFileList);
//        for (String url : files) {
//            StageImg stageImg = StageImg.builder()
//                    .host(host)
//                    .url(url)
//                    .build();
//           stageImgRepository.save(stageImg);
//        }
//
//        List<StageImg> imgs = host.getImgs();
//        List<StageImgDto> response = imgs.stream().map(i -> new StageImgDto(i)).collect(Collectors.toList());
//        return response;
//    }

    @Transactional
    public void deleteImage(Long imageId) {
        StageImg stageImg = stageImgRepository.findById(imageId).orElseThrow(() -> new IllegalArgumentException("해당 이미지가 존재하지 않습니다."));
        awsS3Service.deleteImage(stageImg.getUrl());
        stageImgRepository.delete(stageImg);
    }

    @Transactional
    public void deleteRepImage(User user) {
        Host host = findByUser(user);

        String repImg = host.getRepImg();
        if (!repImg.equals("")) {
            awsS3Service.deleteImage(repImg);
        }
        StageImg stageImg = stageImgRepository.findByUrl(repImg)
                .orElseThrow(() -> new IllegalArgumentException("해당 무대 이미지가 존재하지 않습니다."));

        stageImgRepository.delete(stageImg);

        host.setRepImg("");
    }
}
