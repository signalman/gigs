import { Box, Button } from '@mui/material';
import React from 'react';
import MyAccountItem from './MyAccountItem';

const buttonStyle = {
  width: '100px',
  height: '40px',
}

const MyAccountBox = ({
  user,
}) => {
  const { uid, name, address, phoneNumber, role } = user;

  return (
    <Box sx={{ width: '100%' }}>
      <MyAccountItem title="유저 아이디">{uid}</MyAccountItem>
      <MyAccountItem title="이름">{name}</MyAccountItem>
      <MyAccountItem title="주소">{address?.road}</MyAccountItem>
      <MyAccountItem title="연락처">{phoneNumber}</MyAccountItem>
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