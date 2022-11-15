package gigsproject.gigs.response;

import lombok.Data;

import java.util.List;

//todo
@Data
public class MyPage {

    //유저 개인 정보
    UserDto user;

    //공연기록
    List<History> histories;

    //받은 제안서 - 스타는 제안서 x
    List<ProposalDto> proposals;

    public MyPage(UserDto user, List<History> histories, List<ProposalDto> proposals) {
        this.user = user;
        this.histories = histories;
        this.proposals = proposals;
    }

    public MyPage(UserDto user, List<History> histories) {
        this.user = user;
        this.histories = histories;
    }

}
