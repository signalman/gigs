import { Box, styled, Typography, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { COLOR } from '../../utils/Constants';
import Card from '../../components/Card';
import { SYMBOL } from '../../utils/Constants';
import mainImg from '../../images/main.png'

const Container = styled(Box)((p) => ({
  width: '100vw',
  margin: '0 auto',
  height: '100vh', // 임시
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
}));

const Block = styled(Box)((p) => ({
  marginTop: '30px',
  width: '100vw',
  height: '70vh', // 임시

}));

/**
 * gigs 접속 시 제일 처음 보여지는 페이지
 * gigs에 대한 안내 혹은 홍보, 이벤트 등이 보여짐
 */
const Main = ({
  children,
}) => {
  const [count, setCount] = useState(100000);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const counter = setInterval(() => {
      setCount(count + 1000);
    }, 3000);
    setCards([{}, {}, {}, {}])
    return () => {
      clearInterval(counter);
    }
  }, [count]);

  return (
    <>
      <Block>
        <Typography sx={{ ml: 6, fontWeight: 'bold' }} variant="h6" gutterBottom>
          신규 스타
        </Typography>
        <Grid container spacing={'75px'} rowSpacing={'25px'} sx={{ pl: '55px', mt: '25px' }}>
          {cards?.map((card, i) => (
            <Grid item key={i}>
              <Card target={SYMBOL.star} card={card} />
            </Grid>
          ))}
        </Grid>
      </Block>
      <Block>
        <Typography sx={{ ml: 6, fontWeight: 'bold' }} variant="h6" gutterBottom>
          신규 포스트
        </Typography>
        <Grid container spacing={'75px'} rowSpacing={'25px'} sx={{ pl: '55px', mt: '25px' }}>
          {cards?.map((card, i) => (
            <Grid item key={i}>
              <Card target={SYMBOL.stage} card={card} />
            </Grid>
          ))}
        </Grid>
      </Block>
      <Block>
        <Typography sx={{ ml: 6, fontWeight: 'bold' }} variant="h5" gutterBottom>
          GIGS 란?
        </Typography>
        <Box sx={{ mt: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img style={{
            width: '654px',
            height: '194px',
          }} src={mainImg} alt="mainImg" />
        </Box>
        <Typography sx={{ textAlign: 'center', mt: 5 }} variant="h4" gutterBottom>
          GIGS 는 공연자와 무대를 쉽게 매칭해 드립니다.
        </Typography>
        <Typography sx={{ fontWeight: 'bold', textAlign: 'center', mt: 7 }} variant="h5" gutterBottom>
          재능 넘치는 스타들이 기다리고 있습니다!
        </Typography>
        <Typography sx={{ fontWeight: 'bold', textAlign: 'center', mt: 3 }} variant="h5" gutterBottom>
          그 스타들에 걸맞는 무대가 준비되어 있습니다!
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box
            sx={{
              display: 'flex',
              width: '230px',
              height: '70px',
              mt: '30px',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '25px',
              fontWeight: 'bold',
              borderRadius: '25px',
              cursor: 'pointer',
              backgroundColor: `${COLOR.main}`,
              boxShadow: `0 0 8px ${COLOR.blacky}`,
              color: 'white',

            }}
            onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }) }}
          >
            지금 바로 가입하기
          </Box>
        </Box>
      </Block>
      {/* <Container>
        <img style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          zIndex: -100,
          opacity: .5,
        }} src="https://cdn-afpnk.nitrocdn.com/BgEWMcOYKEoUiTnQXhfKSvRSdRITWbgr/assets/static/optimized/rev-e48f82d/wp-content/uploads/2021/06/Musician-Image.png" alt="iimg" />
        <Box sx={{ display: 'flex', flexDirection: 'column', }}>
          <Box sx={{ fontSize: '40px', alignSelf: 'flex-start', mb: '20px' }}><span style={{ fontStyle: 'italic', fontWeight: 'bold', color: COLOR.main }}>gigs</span>는 현재</Box>
          <Box sx={{ fontSize: '80px', fontWeight: 'bold', alignSelf: 'center', mb: '20px' }}>{count}명의</Box>
          <Box sx={{ fontSize: '40px', alignSelf: 'flex-end' }}>스타와 함께 하고 있습니다!</Box>
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
            onClick={() => { alert('뻥이야') }}
          >
            지금 바로 가입하기
          </Box>
        </Box>
      </Container> */}
    </>
  );
};

export default Main;