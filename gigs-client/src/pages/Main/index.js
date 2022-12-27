import { Box, styled, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { COLOR } from '../../utils/Constants';
import Card from '../../components/Card';
import { SYMBOL } from '../../utils/Constants';
import mainImg from '../../images/main_image.jpg'
import { getNewCards } from '../../utils/Api';
import { useNavigate } from 'react-router-dom';

const toStarCard = (data) => {
  return ({
    id: data.starId,
    imgUrl: data.starImgUrl,
    name: data.starName,
    avgScore: data.avgScore,
    reviewCount: data.reviewCount,

    memberNumber: data.memberNumber,
    gender: data.gender,
    showCount: data.showCount,
    genres: data.genres,
    starStageTypes: data.starStageTypes,
  });
};

const toHostCard = (data) => {
  return ({
    id: data.hostId,
    imgUrl: data.stageImgUrl,
    name: data.name,
    avgScore: data.score,
    reviewCount: data.reviewCount,

    address: data.address,
    stageSize: data.stageSize,
    showCount: data.showCount,
    pay: data.pay,
    stageType: data.stageType,
    targetAge: data.targetAge,
    targetGender: data.targetGender,
    targetMinCount: data.targetMinCount,
  });
};

const BlockTitle = styled(Box)((props) => ({
  width: '100%',
  height: '100px',
  lineHeight: '100px',
  textIndent: '20px',
  fontSize: '22px',
  fontWeight: 'bold',
}));

const Block = styled(Box)((p) => ({
  marginTop: '30px',
  width: '100%',
  overflowX: 'auto'
}));

const CardBox = styled(Box)((props) => ({
  boxSizing: 'border-box',
  padding: '10px',
  display: 'flex',
  width: '7000px',
  columnGap: '50px',
}));

const IntroBox = styled(Box)((props) => ({
  width: '100%',
  height: '500px',
  position: 'relative',
  '::after': {
    content: "''",
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0, left: 0,
    backgroundColor: `#00000080`,
    zIndex: 10,
  }
}));

const mainImgStyle = {
  position: 'absolute',
  top: 0, left: 0,
  objectFit: 'cover',
}

const IntroMessageBox = styled(Box)((props) => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  zIndex: 20,
  top: 0, left: 0,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'white',
}));

/**
 * gigs 접속 시 제일 처음 보여지는 페이지
 * gigs에 대한 안내 혹은 홍보, 이벤트 등이 보여짐
 */
const Main = ({
  
}) => {
  const navigate = useNavigate();

  const [stars, setStars] = useState([]);
  const [hosts, setHosts] = useState([]);

  const getCards = useCallback(async() => {
    try {
      const response = await getNewCards();
      console.log('# 최신 카드 정보');
      console.log(response);

      setStars(response.data.starCards);
      setHosts(response.data.stageCards);
    } catch(err) {
      const statusCode = err.response.status;
      if(statusCode === 500) {
        navigate('/error', {state: {msg: '서버에 문제가 발생했습니다.'}});
      }
    }
  }, []);

  useEffect(() => {
    getCards();
  }, []);

  return (
    <>
      <IntroBox>
        <img src={mainImg} alt="main_image" width='100%' height='500px' style={mainImgStyle} />
        <IntroMessageBox>
          <Typography sx={{ textAlign: 'center', mt: 5, fontWeight: 'bold' }} variant="h4" gutterBottom>
            <span style={{color: COLOR.main}}>GIGS</span> 는 공연자와 무대를 쉽게 매칭해 드립니다.
          </Typography>
          <Typography sx={{ fontWeight: 'bold', textAlign: 'center', mt: 7 }} variant="h5" gutterBottom>
            재능 넘치는 스타들이 기다리고 있습니다!
          </Typography>
          <Typography sx={{ fontWeight: 'bold', textAlign: 'center', mt: 3 }} variant="h5" gutterBottom>
            그 스타들에 걸맞는 무대가 준비되어 있습니다!
          </Typography>
        </IntroMessageBox>
      </IntroBox>

      <BlockTitle>신규 스타</BlockTitle>
      <Block>
        <CardBox>
          {stars?.map((card, i) => (
            <Card target={SYMBOL.star} card={card} />
          ))}
        </CardBox>
      </Block>

      <BlockTitle>신규 무대</BlockTitle>
      <Block>
        <CardBox>
          {hosts?.map((card, i) => (
            <Card target={SYMBOL.stage} card={card} />
          ))}
        </CardBox>
      </Block>
    </>
  );
};

export default Main;