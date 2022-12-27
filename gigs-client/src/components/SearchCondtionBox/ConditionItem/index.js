import styled from '@emotion/styled';
import { Box } from '@mui/material';
import React from 'react';
import { COLOR } from '../../../utils/Constants';

const Container = styled(Box)((props) => ({
  width: '200px',
}));

const Title = styled(Box)((props) => ({
  width: '100%',
  height: '30px',
  textIndent: '10px',
  lineHeight: '30px',
  color: COLOR.main,
  fontWeight: 'bold',
  fontSize: '18px',
}));

const Content = styled(Box)((props) => ({
  boxSizing: 'border-box',
  padding: '30px 0',
  width: '100%',
  borderTop: `1px solid ${COLOR.brightGrey}`,
}));

const ConditionItem = ({
  title,
  children,
}) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Content>
        {children}
      </Content>
    </Container>
  );
};

export default ConditionItem;