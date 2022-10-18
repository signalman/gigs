import { Box, styled } from '@mui/material';
import React from 'react';

const Container = styled(Box)((p) => ({
  width: '100%',
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
      </Container>
    </>
  );
};

export default Main;