import styled from '@emotion/styled';
import { Box, Button, Rating } from '@mui/material';
import React from 'react';
import { COLOR } from '../../utils/Constants';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import EditIcon from '@mui/icons-material/Edit';

const Container = styled(Box)((props) => ({
  width: '1200px',
  height: '100px',
  margin: '0 auto',
  position: 'relative',
}));

const Name = styled(Box)((props) => ({
  height: "100px",
  lineHeight: "100px",
  fontSize: "40px",
  fontWeight: "bold",
  color: COLOR.blacky,
  display: 'flex',
}));

const EditIconBox = styled(Box)((props) => ({
  width: '50px',
  height: '50px',
  alignSelf: 'center',
  display: 'flex',
  cursor: 'pointer',
}));

const Address = styled(Box)((props) => ({
  height: "50px",
  fontSize: '18px',
  fontWeight: "bold",
  color: COLOR.blacky,
  display: 'flex',
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

const ReviewCount = styled(Box)((props) => ({
  fontSize: '10px',
  height: '30px',
  lineHeight: '30px',
}));

const InfoTitle = ({
  titleInfo,
  openEditNameDialog,
  openEditAddressDialog,
  editable,
}) => {
  const {
    name,
    address,
    score,
    reviewCount,
  } = titleInfo;
  return (
    <Container>
      <Name>
        {name ? name : '이름을 입력해주세요.'}
        {editable ? (
          <EditIconBox onClick={() => openEditNameDialog()}>
            <EditIcon sx={{ m: '10px', width: '30px', height: '30px', }} />
          </EditIconBox>
        ) : (<></>)}
      </Name>
      <Address>{address ? `${address.siDo} ${address.siGun} ${address.road}` : '주소를 입력해주세요.'}
        {editable ? (
          <EditIconBox sx={{ w: '20px', h: '20px' }} onClick={() => openEditAddressDialog()}>
            <EditIcon sx={{ m: '3px', width: '20px', height: '20px', }} />
          </EditIconBox>
        ) : (<></>)}
      </Address>
      <ButtonBox>
        <ConnectButton variant='contained'>연결</ConnectButton>
        <RatingBox>
          <Rating
            sx={{ width: `75px` }}
            emptyIcon={<StarBorderIcon sx={{ width: `15px`, height: `15px` }}></StarBorderIcon>}
            icon={<StarIcon sx={{ width: `15px`, height: `15px` }}></StarIcon>}
            value={Number(score)} precision={0.1} readOnly
          />
          <ReviewCount>{`(${reviewCount})`}</ReviewCount>
          <ArrowForwardIosIcon sx={{ height: '10px' }} />
        </RatingBox>
      </ButtonBox>
    </Container>
  );
};

export default InfoTitle;