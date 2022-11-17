import styled from '@emotion/styled';
import { Box, Button } from '@mui/material';
import React from 'react';
import StageImg from '../../images/stage_tmp.jpg';
import {COLOR} from '../../utils/Constants';

const ImgBox = styled(Box)((props) => ({
  width: `100%`,
  height: '250px',
  borderRadius: '0 0 50px 50px',
  overflow: 'hidden',
  boxShadow: `0 4px 4px ${COLOR.grey}`
}));

const buttonStyle = {
  height: '50px',
  lineHeight: '50px',
  fontSize: '16px',
  fontWeight: 'bold',
}

const MyInfoBox = () => {
  return (
    <Box sx={{ width: '100%' }}>
      <ImgBox>
        <img src={StageImg} alt="stage_img" width="100%" height='300px' />
      </ImgBox>
      <Box sx={{ width: '100%', display: 'flex', height: '50px', justifyContent: 'center' }}>
        <Button sx={buttonStyle} >상세 보기</Button>
      </Box>
    </Box>
  );
};

export default MyInfoBox;