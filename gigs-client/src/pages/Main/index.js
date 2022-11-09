import { Box, styled } from '@mui/material';
import React from 'react';
// import KakaoBtn from '../../../public/img/kakao_login_button.png';

const Container = styled(Box)((p) => ({
  width: '1200px',
  margin: '0 auto',
  height: '1500px', // 임시
  backgroundColor: 'pink',
}));

/**
 * gigs 접속 시 제일 처음 보여지는 페이지
 * gigs에 대한 안내 혹은 홍보, 이벤트 등이 보여짐
 */
const Main = ({
  children,
}) => {
  return (
    <>
      <Container>
        {children}
        <img src={"/img/kakao_login_button.png"} alt="asdf" />
      </Container>
    </>
  );
};

export default Main;