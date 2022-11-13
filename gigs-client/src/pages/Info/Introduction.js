import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { COLOR } from '../../utils/Constants';

const Container = styled(Box)((props) => ({
  width: '1100px',
  margin: '0 auto',
  marginTop: '50px',
  paddingLeft: '50px',
  paddingRight: '50px',
  boxShadow: `0 2px 2px ${COLOR.blacky}`,
}));

const Title = styled(Typography)((props) => ({
  height: '50px',
  lineHeight: '50px',
  fontSize: '20px',
  fontWeight: 'bold',
  borderBottom: '1px solid black'
}));

const Content = styled(Box)((props) => ({
  paddingTop: '25px',
  paddingBottom: '25px',
}));

const Introduction = ({
  introduction,
}) => {
  return (
    <Container>
      <Title>
        소개글
      </Title>
      <Content dangerouslySetInnerHTML={{__html: introduction}} />
    </Container>
  );
};

export default Introduction;