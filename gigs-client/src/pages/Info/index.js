import { Box } from '@mui/material';
import React from 'react';
import StageDummyImg from '../../images/stage_tmp.jpg';

const Info = () => {
  return (
    <Box sx={{ width: '100%', height: '300px' }}>
      <img src={StageDummyImg} alt="image" width="100%" height="300px" />
    </Box>
  );
};

export default Info;