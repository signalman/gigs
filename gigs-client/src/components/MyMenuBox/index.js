// refactor 221103

import { Box, MenuItem,Fade, Menu} from '@mui/material';
import React , { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { COLOR, PATH } from '../../utils/Constants';
import MenuImg from '../../images/MenuBox.png';

// TODO: 그냥 헤더에 합치기
const MyMenuBox = () => {
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
          width: '75px',
          height: '30px',
          border: `2px solid ${COLOR.lightBlack}`,
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
          <img alt="menu_box" src={MenuImg} width="30px" height="30px"/>
        </Box>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={() => {navigate(PATH.myPage); handleClose()}}>내 정보</MenuItem>
        {/* TODO: 포스트 등록과 로그아웃은 따로 모달로 처리 */}
        <MenuItem onClick={() => {navigate('/posts'); handleClose()}}>포스트 등록</MenuItem>
        
        <MenuItem onClick={() => {navigate('/logout'); handleClose()}}>로그아웃</MenuItem>
      </Menu>
    </>
  );
};

export default MyMenuBox;