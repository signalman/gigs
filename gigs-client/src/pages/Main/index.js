import { Box, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { COLOR } from '../../utils/Constants';

const Container = styled(Box)((p) => ({
  width: '100vw',
  margin: '0 auto',
  height: '100vh', // 임시
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
}));

/**
 * gigs 접속 시 제일 처음 보여지는 페이지
 * gigs에 대한 안내 혹은 홍보, 이벤트 등이 보여짐
 */
const Main = ({
  children,
}) => {
  const [count, setCount] = useState(100000);

  useEffect(() => {
    const counter = setInterval(() => {
      setCount(count + 1000);
    }, 3000);

    return () => {
      clearInterval(counter);
    }
  }, [count]);

  return (
    <>
      <Container>
        <img style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          zIndex: -100,
          opacity: .5,
        }} src="https://cdn-afpnk.nitrocdn.com/BgEWMcOYKEoUiTnQXhfKSvRSdRITWbgr/assets/static/optimized/rev-e48f82d/wp-content/uploads/2021/06/Musician-Image.png" alt="iimg" />
        <Box sx={{display: 'flex', flexDirection: 'column',}}>
          <Box sx={{fontSize: '40px', alignSelf: 'flex-start', mb: '20px'}}><span style={{fontStyle: 'italic', fontWeight: 'bold', color: COLOR.main}}>gigs</span>는 현재</Box>
          <Box sx={{fontSize: '80px', fontWeight: 'bold', alignSelf: 'center', mb: '20px'}}>{count}명의</Box>
          <Box sx={{fontSize: '40px', alignSelf: 'flex-end'}}>스타와 함께 하고 있습니다!</Box>
          <Box
            sx={{
              display: 'flex',
              width: '220px',
              height: '70px',
              mt: '30px',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '25px',
              fontWeight: 'bold',
              alignSelf: 'center',
              backgroundColor: `${COLOR.main}00`,
              // color: COLOR.main,
              boxShadow: 0,
              borderRadius: '25px',
              cursor: 'pointer',
              userSelect: 'none',
              transition: '.5s ease-out',
              '&:hover': {
                backgroundColor: `${COLOR.main}`,
                boxShadow: `0 0 8px ${COLOR.blacky}`,
                color: 'white',
              }
            }}
            onClick={() => {alert('뻥이야')}}
          >
            지금 바로 가입하기
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Main;