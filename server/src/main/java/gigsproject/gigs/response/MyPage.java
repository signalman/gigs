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

    //공연기록
    List<History> histories;

    //받은 제안서 - 스타는 제안서 x
    List<ProposalDto> proposals;

    public MyPage(UserDto user, Long id, String imgUrl, List<History> histories, List<ProposalDto> proposals) { //호스트일때 생성자
        this.user = user;
        this.roleId = id;
        this.imgUrl = imgUrl;
        this.histories = histories;
        this.proposals = proposals;
    }

    public MyPage(UserDto user, Long id, StarStatus status, String imgUrl, List<History> histories) { //스타일때 생성자
        this.user = user;
        this.roleId = id;
        this.status = status.name();
        this.imgUrl = imgUrl;
        this.histories = histories;
    }

}
