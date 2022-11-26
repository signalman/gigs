import { Box, Button } from '@mui/material';
import React from 'react';
import { useCookies } from 'react-cookie';
import TmpImg from '../../images/stage_tmp.jpg';
import MenuImg from '../../images/MenuBox.png';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import LogoutIcon from '@mui/icons-material/Logout';
import { COLOR } from '../../utils/Constants';

const containerStyle = (fixed) => ({
  width: fixed ? '100%' : {
    m: '50px',
    t: '50px',
    l: '100%',
    d: '100%',
  },
  height: fixed ? '100px' : {
    m: '50px',
    t: '50px',
    l: '100px',
    d: '100px',
  },
  minWidth: fixed ? '150px' : {
    m: '50px',
    t: '50px',
    l: '150px',
    d: '150px',
  },
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const loginButtonStyle = {
  fontSize: '20px',
  fontWeight: 'bold',
}

const menuIconStyle = {
  width: '50px',
  height: '50px',
}

const profileBoxStyle = {
  width: '100%',
  height: '100px',
};

const miniProfileStyle = {
  width: '100%',
  height: '50px',
  display: 'flex',
};

const profileImageBoxStyle = {
  width: '50px',
  height: '50px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const profileImageStyle = {
  width: '30px',
  height: '30px',
  borderRadius: '15px',
  overflow: 'hidden',
}

const profileNameStyle = {
  width: 'calc(100%-50px)',
  height: '50px',
  lineHeight: '50px',
  textIndent: '10px',
  fontSize: '16px',
  fontWeight: 'bold',
}

const buttonBoxStyle = {
  width: '100%',
  height: '50px',
  display: 'flex',
};

const buttonStyle = {
  boxSizing: 'border-box',
  display: 'flex',
  flexGrow: 1,
  justifyContent: 'center',
  alignItems: 'center',
  height: '50px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: COLOR.whity,
  }
}

const Profile = ({
  fixed,
  mdl,
  onLoginClick,
  onMenuClick,
}) => {
  const [cookies, setCookie, removeCookie] = useCookies(['userId']);
  const isLogin = Boolean(cookies.userId);

  return (
    <Box sx={containerStyle(fixed)}>
      {isLogin ? (
        mdl ? (
          <Box sx={menuIconStyle} onClick={onMenuClick}>
            <img src={MenuImg} alt="menu" width='50px' />
          </Box>
        ) : (
          <Box sx={profileBoxStyle}>
            <Box sx={miniProfileStyle}>
              <Box sx={profileImageBoxStyle}>
                <Box sx={profileImageStyle}>
                  <img src={TmpImg} alt='img' height='40px' />
                </Box>
              </Box>
              <Box sx={profileNameStyle}>
                카페 안녕
              </Box>
            </Box>
            <Box sx={buttonBoxStyle}>
              <Box sx={buttonStyle}>
                <ManageAccountsIcon sx={{ width: '25px', height: '25px'}} />
              </Box>
              <Box sx={buttonStyle}>
                <MoreTimeIcon sx={{ width: '25px', height: '25px'}} />
              </Box>
              <Box sx={buttonStyle}>
                <LogoutIcon sx={{ width: '25px', height: '25px'}} />
              </Box>
            </Box>
          </Box>
        )
      ) : (
        <Button sx={loginButtonStyle} onClick={onLoginClick}>로그인하기</Button>
      )}
    </Box>
  );
};

export default Profile;