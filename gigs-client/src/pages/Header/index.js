// refactor 221103

import { Box, Button, Drawer, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import HeaderBtn from '../../components/HeaderBtn';
import MyMenuBox from '../../components/MyMenuBox';
import { BP, COLOR, PATH } from '../../utils/Constants';
import LogoImg from '../../images/gigs_logo_tmp.png';
import styled from '@emotion/styled';
import {useMediaQuery} from '@mui/material';
import { flexbox } from '@mui/system';
import Profile from './Profile';

const containerStyle = {
  width: '100%',
  height: {
    m: '50px',
    t: '50px',
    l: '100px',
    d: '100px',
  },
  backgroundColor: 'white',
  boxShadow: '0 0 4px black',
  zIndex: 100,
};

const contentStyle = {
  margin: "0 auto",
  width: {
    m: '100%',
    t: '100%',
    l: '100%',
    d: '1200px',
  },
  height: '100%',
  display: 'flex',
  justifyContent: 'space-between',
};

const smallBoxStyle = {
  width: {
    m: '20%',
    t: '20%',
    l: '20%',
    d: '250px',
  },
  minWidth: '150px',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const buttonBoxStyle = {
  boxSizing: 'border-box',
  width: {
    m: '60%',
    t: '60%',
    l: '60%',
    d: '700px',
  },
  height: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  px: '50px',
  alignItems: 'center',
};

const drawerButtonBoxStyle = {
  width: '250px',
}

const drawerButtonStyle = {
  width: '100%',
  textAlign: 'center',
  fontSize: '16px',
  height: '50px',
  lineHeight: '50px',
  display: 'flex',
  flexDirection: 'column',
  color: COLOR.blacky,
}

/**
 * 화면 상단 위치에 고정된 헤더
 */
const Header = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('l'));

  const [isOpen, setOpen] = useState(false);

  return (
  <>
    <Box sx={containerStyle}>
      <Box sx={contentStyle}>
        <Box sx={smallBoxStyle}>
          <Button onClick={() => navigate(PATH.main)}>
            <img alt="gigs_logo" src={LogoImg} width="150px" height={matches ? '50px' : '100px'}/>
          </Button>
        </Box>
        {matches ? (<></>) : (
          <Box sx={buttonBoxStyle}>
            <HeaderBtn
              isClicked={pathname === PATH.searchStage}
              handleClick={() => {navigate(PATH.searchStage);}}  
            >무대 찾기</HeaderBtn>
            <HeaderBtn
              isClicked={pathname === PATH.searchStar}
              handleClick={() => {navigate(PATH.searchStar);}}  
            >스타 찾기</HeaderBtn>
            <HeaderBtn
              isClicked={pathname === PATH.review}
              handleClick={() => {navigate(PATH.review);}}
            >이용 후기</HeaderBtn>
          </Box>
        )} 
        
        <Profile />
        {/* <Box sx={smallBoxStyle}>
          <MyMenuBox matches={matches} setOpen={setOpen} />
        </Box> */}
      </Box>
    </Box>
    {matches ? (
      <Drawer
        anchor='right'
        open={isOpen}
        onClose={() => {setOpen(false)}}
      >
        <Box sx={drawerButtonBoxStyle}>
          <Button sx={drawerButtonStyle}
            onClick={() => {navigate(PATH.searchStage);}}  
          >무대 찾기</Button>
          <Button sx={drawerButtonStyle}
            onClick={() => {navigate(PATH.searchStar);}}  
          >스타 찾기</Button>
          <Button sx={drawerButtonStyle}
            onClick={() => {navigate(PATH.review);}}
          >이용 후기</Button>
        </Box>
      </Drawer>
    ) : (<></>)}
  </>
  );
}

export default Header;