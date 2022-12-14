import styled from '@emotion/styled';
import { Box } from '@mui/material';
import moment from 'moment';
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

  const handleCancelProposal = useCallback((proposalId) => {
    onCancel(proposalId);
    setSelectedProposal(null);
  }, []);

  return(
    <Box
      sx={{
        width: '100%',
        display: 'flex',
      }}
    >
      <ProposalWrapper>
        <Proposal isStar={isStar} proposal={selectedProposal} onCancel={handleCancelProposal} />
      </ProposalWrapper>
      <ProposalListBox>
        {Object.keys(proposalsByDate).sort().map(date => (
          <MyProposalDate key={date} date={date} proposals={proposalsByDate[date]} onClick={handleClickProposal} selectedProposal={selectedProposal} />
        ))}
      </ProposalListBox>
    </Box>
  );
};

export default MyProposalBox;