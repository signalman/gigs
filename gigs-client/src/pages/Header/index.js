import { Box, styled } from '@mui/material';
import React from 'react';

const Container = styled(Box)((p) => ({
  position: 'fixed',
  width: '100%',
  height: '200px',
  backgroundColor: "red",
}));

const HeaderBox = styled(Box)((p) => ({
  margin: "0 auto",
  width: '1200px',
  height: '100%',
  backgroundColor: 'blue',
  display: 'flex',
}));

const SmallBox = styled(Box)((p) => ({
  width: '250px',
  height: '100%',
  backgroundColor: 'yellow',
}));

const MenuBtnBox = styled(Box)((p) => ({
  width: '700px',
  height: '100%',
  backgroundColor: 'green',
}));

/**
 * 화면 상단 위치에 고정된 헤더
 */
const Header = () => {
  return (
  <>
    <Container>
      <HeaderBox>
        <SmallBox>로고</SmallBox>
        <MenuBtnBox>메뉴 버튼들</MenuBtnBox>
        <SmallBox>마이메뉴</SmallBox>
      </HeaderBox>
    </Container>
  </>
  );
}

export default Header;