import styled from '@emotion/styled';
import { Box } from '@mui/material';
import React from 'react';
import { COLOR } from '../../utils/Constants';

const Container = styled(Box)(({ is_selected }) => ({
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
  color: `${is_selected ? 'white' : COLOR.main}`,
  background: `${is_selected ? COLOR.main : 'white'}`,
  fontWeight: 'bold',
  cursor: 'pointer',
  userSelect: 'none',
}));

const MyProposalItem = ({
  children,
  onClick,
  isSelected,
}) => {
  return (
    <Container onClick={onClick} is_selected={isSelected}>
      {children}
    </Container>
  );
};

export default MyProposalItem;