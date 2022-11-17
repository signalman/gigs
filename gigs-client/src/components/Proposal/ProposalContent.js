import styled from '@emotion/styled';
import { Box } from '@mui/material';
import React from 'react';

const Title = styled(Box)((props) => ({
  width: '80px',
  height: '50px',
  lineHeight: '50px',
  textAlign: 'center',
}));

const Content = styled(Box)((props) => ({
  width: '180px',
  minHeight: '50px',
}));

const ProposalContent = ({
  title,
  children,
}) => {
  return (
    <Box
      sx={{
        width: '260px',
        display: 'flex',
        maring: '0 auto',
      }}
    >
      <Title>{title}</Title>
      <Content>{children}</Content>
    </Box>
  );
};

export default ProposalContent;