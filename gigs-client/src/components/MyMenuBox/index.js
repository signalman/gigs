import { Box, Button, MenuItem,Fade, Menu} from '@mui/material';
import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';

const MyMenuBox = ({
}) => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box
        sx={{
          width: '90px',
          height: '40px',
          border: '2px solid #c0c0c0',
          borderRadius: '40px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
        }}
        onClick={handleClick}
      >
        <Box
          sx={{
            width: '30px',
            height: '30px',
            p : 0,
          }}
        >
          <img alt="menu_box" src="img/MenuBox.png" width="30px" height="30px"/>
        </Box>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={() => {navigate('/mypage'); handleClose()}}>내 정보</MenuItem>
        
        <MenuItem onClick={() => {navigate('/posts'); handleClose()}}>포스트 등록</MenuItem>
        
        <MenuItem onClick={() => {navigate('/logout'); handleClose()}}>로그아웃</MenuItem>
      </Menu>
    </>
  );
};

export default MyMenuBox;