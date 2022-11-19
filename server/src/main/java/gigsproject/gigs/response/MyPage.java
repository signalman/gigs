package gigsproject.gigs.response;

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

    //공연기록
    List<History> histories;

    //받은 제안서 - 스타는 제안서 x
    List<ProposalDto> proposals;

    public MyPage(UserDto user, Long id, String imgUrl, List<History> histories, List<ProposalDto> proposals) {
        this.user = user;
        this.roleId = id;
        this.imgUrl = imgUrl;
        this.histories = histories;
        this.proposals = proposals;
    }

    public MyPage(UserDto user, Long id, String imgUrl, List<History> histories) {
        this.user = user;
        this.roleId = id;
        this.imgUrl = imgUrl;
        this.histories = histories;
    }

}
