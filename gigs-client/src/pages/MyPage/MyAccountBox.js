import { Box, Button } from '@mui/material';
import React from 'react';
import MyAccountItem from './MyAccountItem';

const buttonStyle = {
  width: '100px',
  height: '40px',
}

const MyAccountBox = () => {
  return (
    <Box sx={{ width: '100%' }}>
      <MyAccountItem></MyAccountItem>
      <MyAccountItem></MyAccountItem>
      <MyAccountItem></MyAccountItem>
      <Box sx={{
          width: '100%',
          height: '50px',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <Button variant='contained' sx={buttonStyle} >회원탈퇴</Button>
      </Box>
    </Box>
  );
};

export default MyAccountBox;