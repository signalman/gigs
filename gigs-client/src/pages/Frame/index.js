// refactor 221103

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

/**
 * 헤더의 위치를 잡아주고 바디의 페이지를 라우팅해주는 페이지
 */
const Frame = () => {
  return (
  <>
    <Header />
    
    <Box sx={{ width: '100%', }}>
      <Routes>
        {/* Carousel */}
        <Route exact path="/" element={<Main>메인</Main>} />
        <Route exact path="/stage" element={<Search target={SYMBOL.stage}></Search>} />
        <Route exact path="/star" element={<Search target={SYMBOL.star}></Search>} />
        <Route path="/review" element={<Main>이용 후기</Main>} />
      </Routes>
    </Box>
  </>
  );
}

export default Frame;