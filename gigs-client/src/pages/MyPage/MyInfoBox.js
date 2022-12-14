import styled from '@emotion/styled';
import { Box, Button } from '@mui/material';
import React from 'react';
import StageImg from '../../images/stage_tmp.jpg';
import StarImg from '../../images/star_tmp.jpg';
import {COLOR, IMG} from '../../utils/Constants';
import {useNavigate} from 'react-router-dom';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';

const ImgBox = styled(Box)((props) => ({
  boxSizing: 'border-box',
  width: `100%`,
  height: '250px',
  borderRadius: '0 0 50px 50px',
  overflow: 'hidden',
  boxShadow: `0 4px 4px ${COLOR.grey}`,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
}));

const buttonStyle = {
  height: '50px',
  lineHeight: '50px',
  fontSize: '16px',
  fontWeight: 'bold',
}

const NoImgMessage = styled(Box)((props) => ({
  fontSize: '22px',
  fontWeight: 'bold',
  color: COLOR.blacky,
}));

const NoImgIcon = styled(ImageNotSupportedIcon)((props) => ({
  position: 'absolute',
  width: '200px',
  height: '200px',
  color: COLOR.grey,
  opacity: .25,
}));

const MyInfoBox = ({
  role,
  roleId,
  imgUrl,
}) => {
  const navigate = useNavigate();
  const isHost = role === 'ROLE_HOST';

  const handleInfoClick = () => {
    navigate(`/${isHost ? 'stages' : 'stars'}/${roleId}`);
  }

  return (
    <Box sx={{ width: '100%' }}>
      <ImgBox>
        {imgUrl ? (
          <img src={IMG(imgUrl)} alt="stage_img" width="100%" />
        ) : (
          <>
            <NoImgMessage>등록된 이미지가 없습니다.</NoImgMessage>
            <NoImgIcon />
          </>
        )}
        
      </ImgBox>
      <Box sx={{ width: '100%', display: 'flex', height: '50px', justifyContent: 'center' }}>
        <Button sx={buttonStyle} onClick={handleInfoClick} >상세 보기</Button>
      </Box>
    </Box>
  );
};

export default MyInfoBox;