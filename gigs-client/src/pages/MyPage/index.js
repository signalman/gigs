import { Box } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import MyAccountBox from './MyAccountBox';
import MyHistoryBox from './MyHistoryBox';
import MyInfoBox from './MyInfoBox';
import MyPageItem from './MyPageItem';
import MyProposalBox from './MyProposalBox';
import { acceptProposal, cancelProposal, completeProposal, fetchMyPage, rejectProposal } from '../../utils/Api';
import MyStarStatusSwitch from './MyStarStatusSwitch';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import AlertDialog from '../../components/AlertDialog';
import SimpleDialog from '../../components/AlertDialog';
import WriteReviewDialog from './WriteReviewDialog';

const MyPage = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [histories, setHistories] = useState([]);
  const [proposals, setProposals] = useState([]);

  const [checkPhoneNumberDialogState, setCheckPhoneNumberDialogState] = useState({open: false, phoneNumber: ''});
  const [cancelAlertDialogState, setCancelAlertDialogState] = useState({open: false, proposalId: '-1'});
  const [completeAlertDialogState, setCompleteAlertDialogState] = useState({open: false, proposalId: '-1'});
  const [writeReviewDialogState, setWriteReviewDialogState] = useState({open: false, proposalId: '-1'});

  const getMyPage = useCallback(async () => {
    try {
      const response = await fetchMyPage();
      console.log(response);

      setUser({...response.data.user, roleId: response.data.roleId, status: response.data.status === "ACTIVE" ? true : false, imgUrl: response.data.imgUrl});
      setHistories(response.data.signedOrComp.map(proposal => ({...proposal, createdAt: moment(proposal.createdAt), showStartTime: moment(proposal.showStartTime), showEndTime: moment(proposal.showEndTime), })));
      const isStar = response.data.user.role === 'ROLE_STAR';
      const newProposals = (isStar ? response.data.unsignedOrRejected : response.data.onlyUnsigned)
        .map(proposal => ({...proposal, createdAt: moment(proposal.createdAt), showStartTime: moment(proposal.showStartTime), showEndTime: moment(proposal.showEndTime), }));
      setProposals(newProposals); 
    } catch (err) {
      const statusCode = err.response.status;
      if(statusCode === 500) {
        navigate('/error', {state: {msg: '서버에 문제가 발생했습니다.'}});
      }
    }
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

      navigate(0);
    } catch(err) {
      console.log(err);
    }
  }, [navigate]);

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
  }, [navigate]);

  // 확인 다이얼로그 닫는 함수
  const handleCloseCheckPhoneNumberDialog = () => {
    setCheckPhoneNumberDialogState({open: false, phoneNumber: ''});
  };

  const handleCloseCancelAlertDialog = () => {
    setCancelAlertDialogState({open: false, proposalId: '-1'});
  };

  const handleCloseCompleteAlertDialog = () => {
    setCompleteAlertDialogState({open: false, proposalId: '-1'});
  };

  const handleCloseWriteReviewDialog = () => {
    setWriteReviewDialogState({open: false, proposalId: '-1'});
  };

  // 리뷰 작성 다이얼로그 열기
  const handleOpenWriteReviewDialog = (proposalId) => {
    console.log(proposalId);
    setWriteReviewDialogState({open: true, proposalId});
  };

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
  }, [navigate]);

  // 호스트 혹은 스타가 연락처 확인을 눌렀을 때
  const handleCheckPhoneNumber = useCallback((proposalId) => {
    const history = histories.find(history => history.proposalId === proposalId);
    const phoneNumber = user.role === "ROLE_STAR" ? history.hostPhoneNumber : history.starPhoneNumber;
    setCheckPhoneNumberDialogState({open: true, phoneNumber});
  }, [histories, user]);

  // 호스트 혹은 스타가 예약된 공연 취소를 눌렀을 때
  const handleCancelSignedProposal = useCallback(async (proposalId) => {
    try {
      const response = await completeProposal(proposalId)
      console.log('# 예약된 공연 취소 결과');
      console.log(response);

      navigate(0);
    } catch(err) {
      console.log(err);
    }
  }, [navigate]);

  // 호스트 혹은 스타가 공연 완료를 눌렀을 때
  const handleCompleteProposal = useCallback(async (proposalId) => {
    try {
      const response = await completeProposal(proposalId)
      console.log('# 공연 완료 결과');
      console.log(response);

      navigate(0);
    } catch(err) {
      console.log(err);
    }
  }, [navigate]);

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
        <MyHistoryBox histories={histories} onCheckPhoneNumber={handleCheckPhoneNumber} onCancel={(proposalId) => setCancelAlertDialogState({open: true, proposalId})} onComplete={(proposalId) => setCompleteAlertDialogState({open: true, proposalId})} onWriteReview={handleOpenWriteReviewDialog} />
      </MyPageItem>

      <SimpleDialog title='연락처 확인' content={checkPhoneNumberDialogState.phoneNumber} onPositive={handleCloseCheckPhoneNumberDialog} open={checkPhoneNumberDialogState.open} onClose={handleCloseCheckPhoneNumberDialog} />
      <AlertDialog title='공연 취소' content='선택한 공연이 취소됩니다. 정말로 취소하시겠습니까?' onPositive={() => handleCancelSignedProposal(cancelAlertDialogState.proposalId)} onNegative={handleCloseCancelAlertDialog} open={cancelAlertDialogState.open} onClose={handleCloseCancelAlertDialog}/>
      <AlertDialog title='공연 완료' content='공연을 완료하셨나요? 공연이 완료되면 리뷰를 작성할 수 있게 됩니다.' onPositive={() => handleCompleteProposal(completeAlertDialogState.proposalId)} onNegative={handleCloseCompleteAlertDialog} open={completeAlertDialogState.open} onClose={handleCloseCompleteAlertDialog}/>
      <WriteReviewDialog open={writeReviewDialogState.open} onClose={handleCloseWriteReviewDialog} proposalId={writeReviewDialogState.proposalId} />
    </Box>
  );
};

export default MyPage;