import styled from '@emotion/styled';
import { Box } from '@mui/material';
import React from 'react';

const Container = styled(Box)((props) => ({
  width: '100%',
  height: 100,
  backgroundColor: 'red',
  display: 'flex',
  flexWrap: 'wrap',
  alignContent: 'flex-start',
  gap: '10px',
}));

const MyProposalDate = () => {
  return (
    <Container>

    </Container>
  );
};

export default MyProposalDate;