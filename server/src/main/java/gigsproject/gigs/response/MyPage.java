package gigsproject.gigs.response;

import lombok.Data;

import java.util.List;

@Data
public class MyPage {

    //유저 개인 정보
    UserDto user;

    //공연기록
    List<History> histories;

    //받은 제안서 - 스타는 제안서 x
    List<ProposalDto> proposalList;

}
