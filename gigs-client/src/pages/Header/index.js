// refactor 221103

import { Box, styled } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import HeaderBtn from '../../components/HeaderBtn';
import LogoBtn from '../../components/LogoBtn';
import MyMenuBox from '../../components/MyMenuBox';
import { PATH } from '../../utils/Constants';

const SmallBox = styled(Box)((p) => ({
  width: '250px',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

/**
 * 화면 상단 위치에 고정된 헤더
 */
const Header = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();

  return (
  <>
    <Box sx ={{
      position: 'fixed',
      width: '100%',
      height: '200px',
      backgroundColor: 'white',
      boxShadow: '0 0 4px black',
      zIndex: 100,
    }}>
      <Box sx={{
        margin: "0 auto",
        width: '1200px',
        height: '100%',
        display: 'flex',
      }}>
        <SmallBox>
          <LogoBtn
            handleClick={() => navigate(PATH.main)}
          ><img alt="logo_tmp" src="img/gigs_logo_tmp.png"/></LogoBtn>
         </SmallBox>
        <Box sx={{
          width: '700px',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
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
        <SmallBox>
          <MyMenuBox />
        </SmallBox>
      </Box>
    </Box>
  </>
  );
}

export default Header;