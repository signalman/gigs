import { Button, MenuItem,Fade, Menu} from '@mui/material';
import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';

const MyMenuBox = ({
  children,
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
      <Button
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {children}
        </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
           'aria-labelledby': 'fade-button',
        }}
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