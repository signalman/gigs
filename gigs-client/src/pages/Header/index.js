import { Box, styled } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderBtn from '../../components/HeaderBtn';
import LogoBtn from '../../components/LogoBtn';
import MyMenuBox from '../../components/MyMenuBox';

const Container = styled(Box)((p) => ({
  position: 'fixed',
  width: '100%',
  height: '200px',
  backgroundColor: 'white',
  boxShadow: '0 0 4px black',
  zIndex: 100,
}));

const HeaderBox = styled(Box)((p) => ({
  margin: "0 auto",
  width: '1200px',
  height: '100%',
  display: 'flex',
}));

const SmallBox = styled(Box)((p) => ({
  width: '250px',
  height: '100%',
  border: '0.5px solid gray',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const MenuBtnBox = styled(Box)((p) => ({
  width: '700px',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: '0.5px solid gray'
}));

/**
 * 화면 상단 위치에 고정된 헤더
 */
const Header = () => {
  const pathname = window.location.pathname;
  const navigate = useNavigate();

  return (
  <>
    <Container>
      <HeaderBox>
        <SmallBox>
          <LogoBtn
            handleClick={() => navigate('/')}
          ><img alt="logo_tmp" src="img/gigs_logo_tmp.png"/></LogoBtn>
         </SmallBox>
        <MenuBtnBox>
          <HeaderBtn
            isClicked={pathname === '/stage'}
            handleClick={() => {navigate('/stage');}}  
          >무대 찾기</HeaderBtn>
          <HeaderBtn
            isClicked={pathname === '/star'}
            handleClick={() => {navigate('/star');}}  
          >스타 찾기</HeaderBtn>
          <HeaderBtn
            isClicked={pathname === '/review'}
            handleClick={() => {navigate('/review');}}
          >이용 후기</HeaderBtn>
        </MenuBtnBox>
        <SmallBox>
          <MyMenuBox />
        </SmallBox>
      </HeaderBox>
    </Container>
  </>
  );
}

export default Header;