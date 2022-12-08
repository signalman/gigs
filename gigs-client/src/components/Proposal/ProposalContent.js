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
  minHeight: '50px',
}));

const ProposalContent = ({
  title,
  children,
  width,
}) => {
  return (
    <Box
      sx={{
        width: `${80 + (width || 180)}px`,
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