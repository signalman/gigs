import styled from '@emotion/styled';
import { Box } from '@mui/material';
import React from 'react';
import { COLOR } from '../../utils/Constants';

const Container = styled(Box)(({ isSelect }) => ({
  boxSizing: 'border-box',
  paddingLeft: '10px',
  paddingRight: '10px',
  minWidth: '70px',
  height: '30px',
  border: `2px solid ${COLOR.main}`,
  borderRadius: '15px',
  textAlign: 'center',
  lineHeight: '26px',
  fontSize: '14px',
  color: isSelect ? 'white' : COLOR.main,
  background: isSelect ? COLOR.main : 'white',
  fontWeight: 'bold',
  cursor: 'pointer',
  userSelect: 'none',
}));

const MyProposalItem = ({
  children,
  onClick,
  isSelect,
}) => {
  return (
    <Container onClick={onClick} isSelect={isSelect}>
      {children}
    </Container>
  );
};

export default MyProposalItem;