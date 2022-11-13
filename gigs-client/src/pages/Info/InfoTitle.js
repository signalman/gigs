import styled from '@emotion/styled';
import { Box, Button, Typography, Rating } from '@mui/material';
import React from 'react';
import { COLOR } from '../../utils/Constants';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Container = styled(Box)((props) => ({
  width: '1200px',
  height: '100px',
  margin: '0 auto',
  position: 'relative',
}));

const Name = styled(Typography)((props) => ({
  height: "100px",
  lineHeight: "100px",
  fontSize: "40px",
  fontWeight: "bold",
  color: COLOR.blacky,
}));

const Address = styled(Typography)((props) => ({
  position: 'absolute',
  left: 0,
  bottom: 0,
  fontSize: '15px',
  color: COLOR.grey,
}));

const ButtonBox = styled(Box)((props) => ({
  position: 'absolute',
  right: 0,
  top: 30,
  width: '120px',
  height: '80px',
}));

const ConnectButton = styled(Button)((props) => ({
  width: '100%',
  height: '40px',
  fontSize: '18px',
  fontWeight: 'bold',
  borderRadius: 3,
}));

const RatingBox = styled(Box)((props) => ({
  display: "flex",
  alignItems: 'center',
  height: '40px',
}));

const ReviewCount = styled(Typography)((props) => ({ height: '30px', lineHeight: '30px', })); 

const InfoTitle = ({
  titleInfo,
}) => {
  const {
    name,
    address,
    avgScore,
    reviewCount,
  } = titleInfo;
  return (
    <Container>
      <Name>{name}</Name>
      <Address>{address.road}</Address>
      <ButtonBox>
        <ConnectButton variant='contained'>연결</ConnectButton>
        <RatingBox>
          <Rating
            sx={{ width: `75px` }}
            emptyIcon={<StarBorderIcon sx={{ width: `15px`, height: `15px` }}></StarBorderIcon>}
            icon={<StarIcon sx={{ width: `15px`, height: `15px` }}></StarIcon>}
            value={Number(avgScore)} precision={0.1} readOnly
          />
          <ReviewCount fontSize="10px">{`(${reviewCount})`}</ReviewCount>
          <ArrowForwardIosIcon sx={{ height: '10px' }} />
        </RatingBox>
      </ButtonBox>
    </Container>
  );
};

export default InfoTitle;