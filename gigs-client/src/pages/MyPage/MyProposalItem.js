import styled from '@emotion/styled';
import { Box } from '@mui/material';
import React from 'react';
import { COLOR } from '../../utils/Constants';

const Container = styled(Box)((props) => ({
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
  color: COLOR.main,
  fontWeight: 'bold',
  cursor: 'pointer',
  userSelect: 'none',
}));

const MyProposalItem = ({
  children,
}) => {
  return (
    <Container>
      {children}
    </Container>
  );
};

export default MyProposalItem;