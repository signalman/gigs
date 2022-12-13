import styled from '@emotion/styled';
import { Box } from '@mui/material';
import React from 'react';
import StageImg from '../../images/stage_tmp.jpg';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IMG } from '../../utils/Constants';

const ImgBox = styled(Box)((props) => ({
  width: '25px',
  height: '25px',
  margin: '12.5px',
  borderRadius: '12.5px',
  overflow: 'hidden',
}));

const NameBox = styled(Box)((props) => ({
  width: '150px',
  height: '50px',
  lineHeight: '50px',
  fontSize: '17px',
  fontWeight: 'bold',
}));

const MiniProfile = ({
  repImg,
  name,
  width,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        width: width || '200px',
        height: '50px',
      }}
    >
      {name ? (
        <>
          <ImgBox>
          {repImg ? (
            <img src={repImg ? IMG(repImg) : StageImg} alt="stage_img" width='25px' height='25px' />
          ) : (
            <AccountCircleIcon sx={{ width: '25px', height: '25px', }} />
          )}
          </ImgBox>
          <NameBox>
            {name}
          </NameBox>
        </>
      ) : (
        <Box sx={{ justifySelf: 'center', lineHeight: '50px', fontWeight: 'bold' }}>
          정보가 없습니다
        </Box>
      )}
    </Box>
  );
};

export default MiniProfile;