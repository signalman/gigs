import { Box, Icon, styled, Typography } from '@mui/material';
import React from 'react';
import PhotoSizeSelectSmallIcon from '@mui/icons-material/PhotoSizeSelectSmall';
import PeopleIcon from '@mui/icons-material/People';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import MicExternalOnIcon from '@mui/icons-material/MicExternalOn';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import { COLOR } from '../../utils/Constants';

const Line = styled(Box)((p) => ({
  width: '100%',
  height: '50px',
  display: 'flex',
}));

const Item = styled(Box)((p) => ({
  width: '400px',
  height: '50px',
  display: 'flex',
}));

const IconBox = styled(Box)(() => ({
  width: '50px',
  height: '50px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const StageDetailInfoBox = () => {
  return (
    <Box
      sx={{
        width: `1200px`,
        m: '0 auto',
        mt: '25px',
        backgroundColor: COLOR.whity,
      }}
    >
      <Line>
        <Item type='half'>
          <IconBox>
            <PhotoSizeSelectSmallIcon sx={{ width: '30px', height: '30px' }} />
          </IconBox>
          <Typography sx={{ height: '50px', lineHeight: '50px', fontSize: '15px' }}>36m^2</Typography>
        </Item>
        <Item type='half'>
          <IconBox>
            <PeopleIcon sx={{ width: '30px', height: '30px' }} />
          </IconBox>
          <Typography sx={{ height: '50px', lineHeight: '50px', fontSize: '15px' }}>20대 여성 20인 이상</Typography>
        </Item>
        <Item type='half'>
          <IconBox>
            <LocalAtmIcon sx={{ width: '30px', height: '30px' }} />
          </IconBox>
          <Typography sx={{ height: '50px', lineHeight: '50px', fontSize: '15px' }}>10만원 이상</Typography>
        </Item>
      </Line>
      <Line>
        
        <Item type='half'>
          <IconBox>
            <MicExternalOnIcon sx={{ width: '30px', height: '30px' }} />
          </IconBox>
          <Typography sx={{ height: '50px', lineHeight: '50px', fontSize: '15px' }}>100회 이상</Typography>
        </Item>
        <Item type='half'>
          <IconBox>
            <LocationOnIcon sx={{ width: '30px', height: '30px' }} />
          </IconBox>
          <Typography sx={{ height: '50px', lineHeight: '50px', fontSize: '15px' }}>CAFE</Typography>
        </Item>
        <Item type='half'>
          <IconBox>
            <HeadsetMicIcon sx={{ width: '30px', height: '30px' }} />
          </IconBox>
          <Typography sx={{ height: '50px', lineHeight: '50px', fontSize: '15px' }}>JAZZ / HIPHOP</Typography>
        </Item>
      </Line>
    </Box>
  );
};

export default StageDetailInfoBox;