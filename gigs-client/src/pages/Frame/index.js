import React from 'react';
import Header from '../Header';
import Main from '../Main';
import { Box, styled } from '@mui/material';

const HeaderSpace = styled(Box)((p) => ({
  height: '200px',
}));

const Body = styled(Box)((p) => ({
  width: '1200px',
  margin: '0 auto',
}));

/**
 * 헤더의 위치를 잡아주고 바디의 페이지를 라우팅해주는 페이지
 */
const Frame = () => {
  return (
  <>
    <Header />
    <HeaderSpace />
    {/* Carousel */}
    <Body>
      바디
      <Main></Main>
    </Body>
  </>
  );
}

export default Frame;