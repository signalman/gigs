package gigsproject.gigs.controller;

import gigsproject.gigs.config.oauth.OAuth2UserCustom;
import gigsproject.gigs.domain.Star;
import gigsproject.gigs.domain.StarImg;
import gigsproject.gigs.domain.User;
import gigsproject.gigs.request.StarEdit;
import gigsproject.gigs.request.StarSearch;
import gigsproject.gigs.response.StarCard;
import gigsproject.gigs.response.StarResponse;
import gigsproject.gigs.service.AwsS3Service;
import gigsproject.gigs.service.StarImgService;
import gigsproject.gigs.service.StarService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;


@RestController
@RequiredArgsConstructor
@Slf4j
public class StarController {
    private final StarService starService;
    private final AwsS3Service awsS3Service;
    private final StarImgService starImgService;

    @GetMapping("/stars")
    public Page<StarCard> getStarCardListCond(@ModelAttribute StarSearch starSearch, Pageable pageable) {
        Page<StarCard> result = starService.getStarCardListCond(starSearch, pageable);
        return result;

    }

    @GetMapping("/stars/{starId}")
    public StarResponse starInfo(@PathVariable Long starId) {
        return starService.findById(starId);
    }

    // TODO: 2022-11-25 - path-variable에서 그냥 /stars로 수정해야함.
    @PutMapping("/stars/{starId}")
    public void update(@RequestBody StarEdit starEdit) {

        //장르, 성별, 멤버, 선호 무대, 스타이름, 소개글
        starService.editStar(starEdit);
    }

    @PostMapping("/stars/rep-image")
    public void updateImage(@RequestParam(name = "file") MultipartFile multipartFile, @AuthenticationPrincipal OAuth2UserCustom oAuth2UserCustom) throws IOException {
        User user = oAuth2UserCustom.getUser();
        Star star = starService.findByUser(user);
        //저장된 이미지를 s3에서 지우고
        String repImgUrl = star.getRepImg();
        if (!repImgUrl.equals("")) {
            awsS3Service.deleteImage(repImgUrl);
        }
        //변경할 이미지를 s3에 업로드 하고
        String newRepImgUrl = awsS3Service.uploadImage(multipartFile);
        //그 이미지 주소를 db에 저장한다.
        starService.editStarImg(star.getStarId(), newRepImgUrl);
        log.info("{}", newRepImgUrl);

    }

    @DeleteMapping("/stars/rep-image")
    public void deleteRepImage(@AuthenticationPrincipal OAuth2UserCustom oAuth2UserCustom) {
        User user = oAuth2UserCustom.getUser();
        Star star = starService.findByUser(user);

        String repImgUrl = star.getRepImg();
        if (!repImgUrl.equals("")) {
            awsS3Service.deleteImage(repImgUrl);
        }
        String newRepImgUrl = "";
        starService.editStarImg(star.getStarId(), newRepImgUrl);
    }

    @PostMapping("/stars/images")
    public void updateImages(@RequestParam(name = "files") List<MultipartFile> multipartFiles, @AuthenticationPrincipal OAuth2UserCustom oAuth2UserCustom) {
        User user = oAuth2UserCustom.getUser();
        Star star = starService.findByUser(user);

        List<String> files = awsS3Service.uploadImages(multipartFiles);

        for (String imgUrl : files) {
            StarImg starImg = StarImg.builder()
                    .star(star)
                    .url(imgUrl)
                    .build();
            starImgService.save(starImg);
        }
    }

    @DeleteMapping("/stars/images/{imageId}")
    public void deleteImage(@RequestParam Long imageId) {

        StarImg findImg = starImgService.findById(imageId);
        awsS3Service.deleteImage(findImg.getUrl());
        starImgService.deleteImg(imageId);
    }

}
