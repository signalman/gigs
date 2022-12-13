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
      const date = proposal.showStartTime.substring(0, 10);
      if(!newProposalsByDate[date]) newProposalsByDate[date] = [];
      newProposalsByDate[date].push(proposal);
    });
    // setProposalsByDate(newProposalsByDate);

    const tmp = {
      '2022-12-12': [{
        "content": "안녕하세요",
        "createdAt": moment("2022-12-12T10:39:56.546Z"),
        "postId": 0,
        "proposalId": 0,
        "showEndTime": moment("2022-12-12T02:00:56.546"),
        "showStartTime": moment("2022-12-12T00:00:56.546"),
        "showStatus": "UNSIGNED",
        "stageName": "카페 안녕",
        "starId": 0,
        "starName": "검정치마"
      }],
      '2022-12-13': [{
        "content": "안녕하세요",
        "createdAt": moment("2022-12-12T10:39:56.546Z"),
        "postId": 0,
        "proposalId": 1,
        "showEndTime": moment("2022-12-12T02:00:56.546"),
        "showStartTime": moment("2022-12-12T04:00:56.546"),
        "showStatus": "REJECTED",
        "stageName": "카페 안녕",
        "starId": 0,
        "starName": "검정치마"
      }],
    }

    setProposalsByDate(tmp);
  }, [proposals]);

  const handleClickProposal = useCallback((proposal) => {
    setSelectedProposal(proposal);
  }, []);

  return(
    <Box
      sx={{
        width: '100%',
        display: 'flex',
      }}
    >
      <ProposalWrapper>
        <Proposal isStar={isStar} proposal={selectedProposal} onCancel={onCancel} />
      </ProposalWrapper>
      <ProposalListBox>
        {Object.keys(proposalsByDate).sort().map(date => (
          <MyProposalDate key={date} date={date} proposals={proposalsByDate[date]} onClick={handleClickProposal} />
        ))}
      </ProposalListBox>
    </Box>
  );
};

export default MyProposalBox;