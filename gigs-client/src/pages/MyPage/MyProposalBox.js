import styled from '@emotion/styled';
import { Box } from '@mui/material';
import React from 'react';
import Proposal from '../../components/Proposal';
import MyProposalItem from './MyProposalItem';

const ProposalWrapper = styled(Box)((props) => ({
  width: '320px',
}));

const ProposalListBox = styled(Box)((props) => ({
  width: '880px',
  padding: '10px',
  display: 'flex',
  flexWrap: 'wrap',
  alignContent: 'flex-start',
  gap: '10px',
}));

const MyProposalBox = () => {
  return(
    <Box
      sx={{
        width: '100%',
        display: 'flex',
      }}
    >
      <ProposalWrapper>
        <Proposal />
      </ProposalWrapper>
      <ProposalListBox>
        <MyProposalItem>박상연</MyProposalItem>
        <MyProposalItem>맛있겠다 치킨</MyProposalItem>
        <MyProposalItem>맛있겠다 치킨</MyProposalItem>
        <MyProposalItem>맛있겠다 치킨</MyProposalItem>
        <MyProposalItem>맛있겠다 치킨</MyProposalItem>
        <MyProposalItem>맛있겠다 치킨</MyProposalItem>
        <MyProposalItem>맛있겠다 치킨</MyProposalItem>
        <MyProposalItem>맛있겠다 치킨</MyProposalItem>
        <MyProposalItem>맛있겠다 치킨</MyProposalItem>
        <MyProposalItem>맛있겠다 치킨</MyProposalItem>
      </ProposalListBox>
    </Box>
  );
};

export default MyProposalBox;