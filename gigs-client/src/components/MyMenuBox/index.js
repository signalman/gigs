// refactor 221103

import { Box, MenuItem,Fade, Menu, Dialog, DialogTitle, DialogContent, Button} from '@mui/material';
import React , { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { COLOR, PATH } from '../../utils/Constants';
import MenuImg from '../../images/MenuBox.png';

/**
 * 헤더에 위치한 메뉴 버튼
 */
const MyMenuBox = () => {
  console.log(process.env);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [isLoginDialogOpen, setLoginDialogOpen] = useState(false);

  // 메뉴 버튼 클릭했을 때
  const handleClick = (event) => {
    const isLogin = false;
    if(isLogin) setAnchorEl(event.currentTarget);
    else {
      setLoginDialogOpen(true);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLoginDialogClose = () => {
    setLoginDialogOpen(false);
  }

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

      <Dialog
        open={isLoginDialogOpen}
        onClose={handleLoginDialogClose}
      >
        <DialogTitle>
          로그인 방법 선택
        </DialogTitle>
        <DialogContent sx={{ display:'flex', flexDirection:'column', }}>
          <a href={API.kakaoAuthorize}>
            <img src={"/img/kakao_login_button.png"} alt="asdf"/>
          </a>
          {/* <Button
            onClick={() => {
              
            }}
          ></Button> */}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MyMenuBox;