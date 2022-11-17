import { Box, Button, styled } from '@mui/material';
import React, { useCallback, useEffect } from 'react';
// import KakaoBtn from '../../../public/img/kakao_login_button.png';
import axios from 'axios';
import { API } from '../../utils/Constants';

const {kakao} = window;

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
  const handleClick = useCallback(async () => {
    await axios.get(API.testApi);
  }, []);

  return (
    <>
      <Container>
        {children}
        <Button onClick={handleClick}>
          api쏘기
        </Button>
      </Container>
    </>
  );
};

export default Main;