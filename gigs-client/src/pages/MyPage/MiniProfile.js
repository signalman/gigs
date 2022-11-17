import styled from '@emotion/styled';
import { Box } from '@mui/material';
import React from 'react';
import StageImg from '../../images/stage_tmp.jpg';

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

const MiniProfile = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '200px',
        height: '50px',
      }}
    >
      <ImgBox>
        <img src={StageImg} alt="stage_img" width='25px' height='25px' />
      </ImgBox>
      <NameBox>
        카페 안녕
      </NameBox>
    </Box>
  );
};

export default MiniProfile;