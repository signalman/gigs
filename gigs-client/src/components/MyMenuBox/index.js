import { Button } from '@mui/material';
import { Box, styled } from '@mui/material';
import React,{useState} from 'react';
import LogoBtn from '../LogoBtn';
import { useNavigate } from 'react-router-dom';

const MenuBox = styled(Box)((p) => ({
    position: 'absolute',
    right: -32,
    top: 65,
    width: '130px',
    height: '120px',
    boxShadow: '0 0 4px black',
  }));

const MyMenuBox = ({
  children,
  /*handleClick,*/
}) => {

    const pathname = window.location.pathname;
    const navigate = useNavigate();

    const [isOpen,setMenu] = useState(false);
    const toggleMenu = () => {
        setMenu(isOpen => isOpen ? false : true);
    };

  return (
    <>
      <Button onClick={toggleMenu}>
        {children}
        {isOpen ? 
        <MenuBox>
            <LogoBtn
          isClicked={pathname === '/mypage'}
          handleClick={() => navigate('/mypage')}>
            <div>내 정보</div>
          </LogoBtn>
          <LogoBtn
          isClicked={pathname === '/posts'}
          handleClick={() => navigate('/posts')}>
            <div>포스트 등록</div>
          </LogoBtn>

          {/*logout 만들어지면 수정*/}
          <LogoBtn
          isClicked={pathname === '/logout'}
          handleClick={() => navigate('/logout')}>
            <div>로그아웃</div>
          </LogoBtn>
    </MenuBox> : null}
      </Button>
    </>
  );
};

export default MyMenuBox;