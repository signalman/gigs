import { Box } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import MyAccountBox from './MyAccountBox';
import MyHistoryBox from './MyHistoryBox';
import MyInfoBox from './MyInfoBox';
import MyPageItem from './MyPageItem';
import MyProposalBox from './MyProposalBox';
import { fetchMyPage } from '../../utils/Api';
import MyStarStatusSwitch from './MyStarStatusSwitch';
import moment from 'moment';

const MyPage = () => {
  const [user, setUser] = useState({});
  const [histories, setHistories] = useState([]);
  const [proposals, setProposals] = useState([]);

  const getMyPage = useCallback(async () => {
    const response = await fetchMyPage();
    console.log(response);

    setUser({...response.data.user, roleId: response.data.roleId, status: response.data.status === "ACTIVE" ? true : false});
    setHistories(response.data.signedOrComp);
    const isStar = response.data.user.role === 'ROLE_STAR';
    const newProposals = (isStar ? response.data.unsignedOrRejected : response.data.onlyUnsigned)
      .map(proposal => ({...proposal, createdAt: moment(proposal.createdAt), showStartTime: moment(proposal.showStartTime), showEndTime: moment(proposal.showEndTime), }));
    setProposals(newProposals);
  }, []);

  useEffect(() => {
    getMyPage();
  }, [getMyPage]);

  const handleClickCancelProposal = useCallback(() => {

  }, []);

  return (
    <Box sx={{ width: '1200px', margin: '0 auto', }}>
      <MyPageItem title="내 계정">
        <MyAccountBox user={user} />
      </MyPageItem>
      <MyPageItem title={user.role === "ROLE_HOST" ? "내 무대" : (user.role === "ROLE_STAR" ? "내 스타" : "")}>
        {user.role === "ROLE_STAR" ? (<MyStarStatusSwitch status={user.status} />) : (<></>)}
        <MyInfoBox role={user.role} roleId={user.roleId} />
      </MyPageItem>
      <MyPageItem title="공연 기록">
        <MyHistoryBox />
      </MyPageItem>
      <MyPageItem title="제안서">
        <MyProposalBox role={user.role} proposals={proposals} onCancel={handleClickCancelProposal} />
      </MyPageItem>
    </Box>
  );
};

export default MyPage;