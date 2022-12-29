package gigsproject.gigs.response;

import gigsproject.gigs.domain.StarStatus;
import lombok.Data;

import java.util.List;

//todo
@Data
public class MyPage {

    //유저 개인 정보
    UserDto user;

    //id  -> 스타id / 호스트id 를 구분하기 힘드므로 roleId라는 변수로 각 역할에 맞는 id를 response
    Long roleId;

    //이미지
    String imgUrl;

    String status;

    List<ProposalDto> unsignedOrRejected; //UNSIGNED REJECTED 상태의 제안서 -> 스타 마이페이지
    List<ProposalDto> onlyUnsigned;       //UNSIGNED 상태의 제안서 -> 호스트 마이페이지
    List<SignedOrCompDto> signedOrComp;       //SIGNED COMP 상태의 제안서 -> (스타, 호스트)공연 히스토리

    //todo: 내가 작성한 모든 리뷰들
    List<ReviewDto> reviews;

    public MyPage(UserDto user, Long id, String imgUrl, List<ProposalDto> onlyUnsigned, List<SignedOrCompDto> signedOrComp, List<ReviewDto> reviews) { //호스트일때 생성자
        this.user = user;
        this.roleId = id;
        this.imgUrl = imgUrl;
        this.onlyUnsigned = onlyUnsigned;
        this.signedOrComp = signedOrComp;
        this.reviews = reviews;
    }

    public MyPage(UserDto user, Long id, StarStatus status, String imgUrl, List<ProposalDto> unsignedOrRejected, List<SignedOrCompDto> signedOrComp, List<ReviewDto> reviews) { //스타일때 생성자
        this.user = user;
        this.roleId = id;
        this.status = status.name();
        this.imgUrl = imgUrl;
        this.unsignedOrRejected = unsignedOrRejected;
        this.signedOrComp = signedOrComp;
        this.reviews = reviews;
    }

}
