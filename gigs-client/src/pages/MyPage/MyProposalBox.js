import styled from '@emotion/styled';
import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Proposal from '../../components/Proposal';
import MyProposalDate from './MyProposalDate';
import MyProposalItem from './MyProposalItem';

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
}) => {
  const isStar = role === 'ROLE_STAR';
  const [proposalsByDate, setProposalsByDate] = useState({});

  useEffect(() => {
    const newProposalsByDate = {};
    proposals.forEach(proposal => {
      const date = proposal.showStartTime.substring(0, 10);
      if(!newProposalsByDate[date]) newProposalsByDate[date] = [];
      newProposalsByDate[date].push(proposal);
    });
    setProposalsByDate(newProposalsByDate);
  }, [proposals]);

  return(
    <Box
      sx={{
        width: '100%',
        display: 'flex',
      }}
    >
      <ProposalWrapper>
        <Proposal isStar={isStar} />
      </ProposalWrapper>
      <ProposalListBox>
        {Object.keys(proposalsByDate).sort().map(date => (
          <div>{date}</div>
        ))}
        <MyProposalDate />

        {/* <MyProposalItem>박상연</MyProposalItem>
        <MyProposalItem>맛있겠다 치킨</MyProposalItem>
        <MyProposalItem>맛있겠다 치킨</MyProposalItem>
        <MyProposalItem>맛있겠다 치킨</MyProposalItem>
        <MyProposalItem>맛있겠다 치킨</MyProposalItem>
        <MyProposalItem>맛있겠다 치킨</MyProposalItem>
        <MyProposalItem>맛있겠다 치킨</MyProposalItem>
        <MyProposalItem>맛있겠다 치킨</MyProposalItem>
        <MyProposalItem>맛있겠다 치킨</MyProposalItem>
        <MyProposalItem>맛있겠다 치킨</MyProposalItem> */}
      </ProposalListBox>
    </Box>
  );
};

export default MyProposalBox;