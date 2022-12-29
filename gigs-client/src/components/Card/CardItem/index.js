import styled from '@emotion/styled';
import { Box } from '@mui/material';
import React from 'react';

const Container = styled(Box)(({ type }) => ({
  width: type === 'half' ? '50%' : '100%',
  height: '37.5px',
  display: 'flex',
}));

const IconBox = styled(Box)((p) => ({
  display: "flex",
  height: "100%",
  width: "40px",
  justifyContent: 'center',
  alignItems: 'center',
}));

const Content = styled(Box)((props) => ({
  maxWidth: 'calc(100% - 40px)',
  fontSize: '12px',
  height: '37.5px',
  display: 'flex',
  alignItems: 'center',
}));

const CardItem = ({
  type,
  Icon,
  children,
}) => {
  return (
    <Container type={type}>
      <IconBox>
        <Icon sx={{ width: '20px', height: '20px', }} />
      </IconBox>
      <Content>{children}</Content>
    </Container>
  );
};

export default CardItem;