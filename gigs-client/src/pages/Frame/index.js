import React from 'react';
import Button from '@mui/material/Button';
import Header from '../Header';
import { Box, styled } from '@mui/material';

const HeaderSpace = styled(Box)((p) => ({
  height: '200px',
}));

const Body = styled(Box)((p) => ({
  width: '100%',
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
    </Body>
  </>
  );
}

export default Frame;