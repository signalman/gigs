import React from 'react';
import Header from '../Header';
import Main from '../Main';
import { Box, styled } from '@mui/material';
import {
  Routes,
  Route,
} from 'react-router-dom';
import Search from '../Search';
import { SYMBOL } from '../../utils/Constants';

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
    
    <Body>
      <Routes>
        {/* Carousel */}
        <Route exact path="/" element={<Main>메인</Main>} />
        <Route exact path="/stage" element={<Search target={SYMBOL.stage}></Search>} />
        <Route exact path="/star" element={<Search target={SYMBOL.star}></Search>} />
        <Route path="/review" element={<Main>이용 후기</Main>} />
      </Routes>
    </Body>
  </>
  );
}

export default Frame;