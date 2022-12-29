// refactor 221103

import React from 'react';
import Header from '../Header';
import Main from '../Main';
import { Box, styled } from '@mui/material';
import {
  Routes,
  Route,
  useMatch,
  useMatches,
  Outlet,
} from 'react-router-dom';
import Search from '../Search';
import { SYMBOL } from '../../utils/Constants';
import SignUp from '../SignUp';
import Info from '../Info';
import MyPage from '../MyPage';
import TopReviews from '../TopReviews';
import ErrorPage from '../ErrorPage';

/**
 * 헤더의 위치를 잡아주고 바디의 페이지를 라우팅해주는 페이지
 */
const Frame = () => {

  return (
  <>
    <Header />
    
    <Box sx={{ width: '100%', }}>
      <Outlet />
    </Box>
  </>
  );
}

export default Frame;