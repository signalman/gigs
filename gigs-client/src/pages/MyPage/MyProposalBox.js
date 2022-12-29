import styled from '@emotion/styled';
import { Box } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import Proposal from '../../components/Proposal';
import MyProposalDate from './MyProposalDate';

const ProposalWrapper = styled(Box)((props) => ({
  width: '320px',
}));

const ProposalListBox = styled(Box)((props) => ({
  width: '880px',
  padding: '10px',
}));

const MyProposalBox = ({
  role,
  proposals,
  onCancel,
  onAccept,
  onReject,
}) => {
  const isStar = role === 'ROLE_STAR';
  const [proposalsByDate, setProposalsByDate] = useState({});
  const [selectedProposal, setSelectedProposal] = useState(null);

  useEffect(() => {
    const newProposalsByDate = {};
    proposals.forEach(proposal => {
      const date = proposal.showStartTime.format('YYYY-MM-DD');
      if(!newProposalsByDate[date]) newProposalsByDate[date] = [];
      newProposalsByDate[date].push(proposal);
    });
    setProposalsByDate(newProposalsByDate);
  }, [proposals]);

  const handleClickProposal = useCallback((proposal) => {
    setSelectedProposal(proposal);
  }, []);

  // 스타가 제안서 취소를 눌렀을 때
  const handleCancelProposal = useCallback((proposalId) => {
    onCancel(proposalId);
    setSelectedProposal(null);
  }, [onCancel]);

  // 호스트가 제안서 승낙을 눌렀을 때
  const handleAcceptProposal = useCallback((proposalId) => {
    onAccept(proposalId);
    setSelectedProposal(null);
  }, [onAccept]);

  // 호스트가 제안서 거절을 눌렀을 때
  const handleRejectProposal = useCallback((proposalId) => {
    onReject(proposalId);
    setSelectedProposal(null);
  }, [onReject]);

  return(
    <Box
      sx={{
        width: '100%',
        display: 'flex',
      }}
    >
      <ProposalWrapper>
        <Proposal isStar={isStar} proposal={selectedProposal} onCancel={handleCancelProposal} onAccept={handleAcceptProposal} onReject={handleRejectProposal} />
      </ProposalWrapper>
      <ProposalListBox>
        {Object.keys(proposalsByDate).sort().map(date => (
          <MyProposalDate key={date} isStar={isStar} date={date} proposals={proposalsByDate[date]} onClick={handleClickProposal} selectedProposal={selectedProposal} />
        ))}
      </ProposalListBox>
    </Box>
  );
};

export default MyProposalBox;