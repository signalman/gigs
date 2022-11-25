// refactor 221103

import { Box, MenuItem, Fade, Menu, Dialog, DialogTitle, DialogContent } from '@mui/material';
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH, URL, } from '../../utils/Constants';
import MenuImg from '../../images/MenuBox.png';
import KakaoLoginButtonImg from '../../images/kakao_login_button.png';
import { useCookies } from 'react-cookie';
import Swal from "sweetalert2";
import styled from '@emotion/styled';
import { logout } from '../../utils/Api';
import PostEnroll from '../PostEnroll';

const Container = styled(Box)((props) => ({
  width: '100px',
  height: '30px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  fontSize: '14px',
}));

const MenuIconBox = styled(Box)((props) => ({
  width: '30px',
  height: '30px',
  padding: 0,
}));

/**
 * 헤더에 위치한 메뉴 버튼
 */
const MyMenuBox = () => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [isLoginDialogOpen, setLoginDialogOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const menuCookie = useCookies('userId')
  // const [, , removeCookie] = useCookies('userId')
  // console.log(menuCookie[0])

  useEffect(() => {
    // 조건문 length 말고 다른 것 있을까요?
    if (Object.keys(menuCookie[0]).length !== 0) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [menuCookie]);

  // 메뉴 버튼 클릭했을 때
  const handleClick = (event) => {

    if (isLogin) setAnchorEl(event.currentTarget);
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

  const handleLogOut = useCallback(async () => {
    try {
      const response = await logout();

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "로그아웃 하였습니다",
          confirmButtonText: "확인"
        }).then(() => {
          // TODO
          window.location.replace('/')
        })
      }
    } catch(err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      <Container onClick={handleClick}>
        {isLogin ? (
          <MenuIconBox><img alt="menu_box" src={MenuImg} width="30px" height="30px" /></MenuIconBox>
        ) : (
          '로그인 / 회원가입'
        )}
      </Container>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={() => { navigate(PATH.myPage); handleClose() }}>내 정보</MenuItem>
        {/* TODO: 포스트 등록과 로그아웃은 따로 모달로 처리 */}
        <MenuItem onClick={() => {}}><PostEnroll/></MenuItem>

        <MenuItem onClick={() => {
          Swal.fire({
            icon: "question",
            title: "로그아웃",
            text: "로그아웃 하시겠습니까?",
            showCancelButton: true,
            confirmButtonText: "예",
            cancelButtonText: "아니요",
          }).then((res) => {
            if (res.isConfirmed) {
              handleLogOut();
            }
          });
          handleClose();
        }}>로그아웃</MenuItem>
      </Menu>

      <Dialog
        open={isLoginDialogOpen}
        onClose={handleLoginDialogClose}
      >
        <DialogTitle>
          로그인 방법 선택
        </DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', }}>
          <a href={URL.kakaoAuthorize}>
            <img src={KakaoLoginButtonImg} alt="asdf" />
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