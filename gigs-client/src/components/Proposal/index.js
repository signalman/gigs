import styled from '@emotion/styled';
import { Box, Button } from '@mui/material';
import React from 'react';
import MiniProfile from '../../pages/MyPage/MiniProfile';
import { COLOR } from '../../utils/Constants';
import ProposalContent from './ProposalContent';

const Container = styled(Box)((props) => ({
  boxSizing: 'border-box',
  width: '300px',
  height: '400px',
  padding: '10px',
  margin: '10px',
  boxShadow: '0 2px 4px black',
  backgroundColor: props.status === 'REJECTED' ? COLOR.grey : 'white',
}));

const Title = styled(Box)((props) => ({
  width: '100%',
  height: '50px',
  textAlign: 'center',
  fontSize: '20px',
  fontWeight: 'bold',
  lineHeight: '50px',
}));

const ButtonBox = styled(Box)((props) => ({
  width: props.is_star ? '70px' : '170px',
  height: '50px',
  display: 'flex',
  alignItems: 'center',
  margin: '0 auto',
}));

const buttonStyle = {
  width: '70px',
  height: '35px',
  color: COLOR.whity,
}

const warningStyle = { 
  height: '20px', 
  lineHeight: '20px',
  mt: '10px',
  fontSize: '13px', 
  fontWeight: 'bold', 
  color: 'red', 
  textAlign: 'center',
}

const NoProposalBox = styled(Box)((props) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: COLOR.grey,
  fontSize: '22px',
  fontWeight: 'bold',
}));

const Proposal = ({
  isStar,
  proposal,
  onCancel,
  onAccept,
  onReject,
}) => {
  return (
    <Container status={proposal?.showStatus}>
      {proposal ? (
        <>
          <Title>제안서</Title>
          <ProposalContent title={'이름'} width='200px'>
            <MiniProfile width='200px' name={isStar ? proposal.stageName : proposal.starName} />
          </ProposalContent>
          <ProposalContent title={'일시'} width='200px'>
            <Box sx={{ width: '100%', height: '50px', lineHeight: '50px', }}>
              {`${proposal.showStartTime.format('YYYY/MM/DD HH:mm')}~${proposal.showEndTime.format('HH:mm')}`}
            </Box>
          </ProposalContent>
          <ProposalContent title={'내용'} width='200px'>
            <Box
              sx={{
                boxSizing: 'border-box',
                width: '200px',
                height: '135px',
                overflow: 'scroll',
                mt: '15px',
                p: '5px',
                fontSize: '12px',
                boxShadow: `inset 0 0 2px ${COLOR.grey}`
              }}
            >
              {proposal.content}
            </Box>
          </ProposalContent>
          <Box sx={warningStyle}>
            {proposal.showStatus === 'REJECTED' ? '* 호스트에 의해 거절되었습니다.' : '* 승낙시 상대방에게 연락처가 전달됩니다.'}
          </Box>
          <ButtonBox is_star={isStar ? 1 : 0}>
            {isStar ? (
              proposal.showStatus === 'REJECTED' ? (
                <Button sx={{...buttonStyle,}} variant="contained" color='warning' onClick={() => onCancel(proposal.proposalId)}>삭제</Button>
              ) : (
                <Button sx={{...buttonStyle,}} variant="contained" color='warning' onClick={() => onCancel(proposal.proposalId)}>취소</Button>
              )
            ) : (
              <>
                <Button sx={buttonStyle} variant="contained" onClick={() => onAccept(proposal.proposalId)}>승낙</Button>
                <Button sx={{...buttonStyle, ml: '30px',}} variant="contained" color='warning' onClick={() => onReject(proposal.proposalId)} >거절</Button>
              </>
            )}
          </ButtonBox>
        </>
      ) : (
        <NoProposalBox>
          선택한 제안서가 없습니다.
        </NoProposalBox>
      )}
    </Container>
  );
};

export default Proposal;