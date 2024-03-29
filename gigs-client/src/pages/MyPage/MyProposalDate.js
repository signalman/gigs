import styled from '@emotion/styled';
import { Box } from '@mui/material';
import React from 'react';
import { COLOR } from '../../utils/Constants';
import MyProposalItem from './MyProposalItem';

const Container = styled(Box)((props) => ({
  width: '100%',
}));

const DateBox = styled(Box)((props) => ({
  width: '100%',
  height: '50px',
  borderBottom: `1px solid ${COLOR.grey}`,
  fontSize: '22px',
  textIndent: '10px',
  lineHeight: '50px',
}));

const ItemBox = styled(Box)((props) => ({
  boxSizing: 'border-box',
  width: '100%',
  padding: '10px',
  display: 'flex',
  flexWrap: 'wrap',
  alignContent: 'flex-start',
  gap: '10px',
  backgroundColor: COLOR.whity,
}));

const MyProposalDate = ({
  isStar,
  date,
  proposals,
  onClick,
  selectedProposal,
}) => {
  return (
    <Container>
      <DateBox>{date}</DateBox>
      <ItemBox>
        {proposals?.map(proposal => (
          <MyProposalItem
            key={proposal.proposalId}
            onClick={() => {onClick(proposal)}}
            isSelected={selectedProposal ? (selectedProposal.proposalId === proposal.proposalId ? 1 : 0) : 0}
          >{isStar ? proposal.stageName : proposal.starName}</MyProposalItem>
        ))}
      </ItemBox>
    </Container>
  );
};

export default MyProposalDate;