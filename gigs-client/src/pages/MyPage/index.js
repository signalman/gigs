import { Box } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import MyAccountBox from './MyAccountBox';
import MyHistoryBox from './MyHistoryBox';
import MyInfoBox from './MyInfoBox';
import MyPageItem from './MyPageItem';
import MyProposalBox from './MyProposalBox';
import { acceptProposal, cancelProposal, fetchMyPage, rejectProposal } from '../../utils/Api';
import MyStarStatusSwitch from './MyStarStatusSwitch';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [histories, setHistories] = useState([]);
  const [proposals, setProposals] = useState([]);

  const getMyPage = useCallback(async () => {
    const response = await fetchMyPage();
    console.log(response);

    setUser({...response.data.user, roleId: response.data.roleId, status: response.data.status === "ACTIVE" ? true : false, imgUrl: response.data.imgUrl});
    setHistories(response.data.signedOrComp.map(proposal => ({...proposal, createdAt: moment(proposal.createdAt), showStartTime: moment(proposal.showStartTime), showEndTime: moment(proposal.showEndTime), })));
    const isStar = response.data.user.role === 'ROLE_STAR';
    const newProposals = (isStar ? response.data.unsignedOrRejected : response.data.onlyUnsigned)
      .map(proposal => ({...proposal, createdAt: moment(proposal.createdAt), showStartTime: moment(proposal.showStartTime), showEndTime: moment(proposal.showEndTime), }));
    setProposals(newProposals);
  }, []);

  useEffect(() => {
    getMyPage();
  }, [getMyPage]);

  // 스타가 제안서 취소를 눌렀을 때
  const handleCancelProposal = useCallback(async (proposalId) => {
    try {
      const response = await cancelProposal(proposalId);
      console.log('# 제안서 취소 결과')
      console.log(response);

      setProposals(proposals.filter(proposal => proposal.proposalId !== proposalId));
    } catch(err) {
      console.log(err);
    }
  }, [proposals]);

  // 호스트가 제안서 승낙을 눌렀을 때
  const handleAcceptProposal = useCallback(async (proposalId) => {
    try {
      const response = await acceptProposal(proposalId);
      console.log('# 제안서 승낙 결과')
      console.log(response);

      navigate(0);
    } catch(err) {
      console.log(err);
    }
  }, []);

  // 호스트가 제안서 거절을 눌렀을 때
  const handleRejectProposal = useCallback(async (proposalId) => {
    try {
      const response = await rejectProposal(proposalId);
      console.log('# 제안서 거절 결과')
      console.log(response);

      navigate(0);
    } catch(err) {
      console.log(err);
    }
  }, []);

  return (
    <Box sx={{ width: '1200px', margin: '0 auto', }}>
      <MyPageItem title="내 계정">
        <MyAccountBox user={user} />
      </MyPageItem>
      <MyPageItem title={user.role === "ROLE_HOST" ? "내 무대" : (user.role === "ROLE_STAR" ? "내 스타" : "")}>
        {user.role === "ROLE_STAR" ? (<MyStarStatusSwitch status={user.status} />) : (<></>)}
        <MyInfoBox role={user.role} roleId={user.roleId} imgUrl={user.imgUrl} />
      </MyPageItem>
      <MyPageItem title="제안서">
        <MyProposalBox role={user.role} proposals={proposals} onCancel={handleCancelProposal} onAccept={handleAcceptProposal} onReject={handleRejectProposal} />
      </MyPageItem>
      <MyPageItem title="공연 기록">
        <MyHistoryBox histories={histories} onCancel={handleCancelProposal} />
      </MyPageItem>
    </Box>
  );
};

export default MyPage;