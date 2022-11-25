import { Box, Button } from '@mui/material';
import React from 'react';
import { useCookies } from 'react-cookie';

const containerStyle = {
  width: '150px',
  height: '100px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

const loginButtonStyle = {
  fontSize: '20px',
  fontWeight: 'bold',
}

const Profile = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['userId']);
  const isLogin = Boolean(cookies.userId);

  return (
    <Box sx={containerStyle}>
      {isLogin ? (
        <></>
      ) : (
        <Button sx={loginButtonStyle}>로그인하기</Button>
      )}
    </Box>
  );
};

export default Profile;