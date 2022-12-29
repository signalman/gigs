import styled from '@emotion/styled';
import { Box } from '@mui/material';
import React from 'react';

const Title = styled(Box)((props) => ({
  width: '100px',
  height: '50px',
  lineHeight: '50px',
  textAlign: 'center',
  fontWeight: 'bold',
}));

const Content = styled(Box)((props) => ({
  height: '50px',
  lineHeight: '50px',
}));

const MyAccountItem = ({
  title,
  children,
}) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '50px',
        display: 'flex',
      }}
    >
      <Title>{title}</Title>
      <Content>{children}</Content>
    </Box>
  );
};

export default MyAccountItem;