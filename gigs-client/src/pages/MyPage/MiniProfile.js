import styled from '@emotion/styled';
import { Box } from '@mui/material';
import React, { useCallback } from 'react';
import StageImg from '../../images/stage_tmp.jpg';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IMG } from '../../utils/Constants';
import { useNavigate } from 'react-router-dom';

const ImgBox = styled(Box)((props) => ({
  width: '25px',
  height: '25px',
  margin: '12.5px',
  borderRadius: '12.5px',
  overflow: 'hidden',
  lineHeight: 0,
}));

const NameBox = styled(Box)((props) => ({
  width: '150px',
  height: '50px',
  lineHeight: '50px',
  fontSize: '17px',
  fontWeight: 'bold',
}));

const MiniProfile = ({
  starId,
  hostId,
  repImg,
  name,
  width,
}) => {
  const navigate = useNavigate();

  const onClick = useCallback(() => {
    if(starId) {
      navigate(`/stars/${starId}`);
    } else if(hostId) {
      navigate(`/stages/${hostId}`);
    }
  }, [starId, hostId]);

  return (
    <Box
      sx={{
        display: 'flex',
        width: width || '200px',
        height: '50px',
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      {name ? (
        <>
          <ImgBox>
            {repImg ? (
              <img src={IMG(repImg)} alt="stage_img" width='25px' height='25px' style={{objectFit: 'cover'}} />
            ) : (
              <AccountCircleIcon sx={{ width: '25px', height: '25px', }} />
            )}
          </ImgBox>
          <NameBox>
            {name}
          </NameBox>
        </>
      ) : (
        <Box sx={{ justifySelf: 'center', lineHeight: '50px', fontWeight: 'bold' }}>
          정보가 없습니다
        </Box>
      )}
    </Box>
  );
};

export default MiniProfile;