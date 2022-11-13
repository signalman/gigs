import { Box, styled, Typography } from '@mui/material';
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

const IconStyle = { width: '30px', height: '30px' }

const ItemContent = styled(Typography)((props) => ({ height: '50px', lineHeight: '50px', fontSize: '15px' }));

const StageDetailInfoBox = ({
  detailInfo,
}) => {
  const {
    stageSize,
    targetAge,
    targetGender,
    targetMinCount,
    pay,
    showCount,
    stageType,
  } = detailInfo;
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
            <PhotoSizeSelectSmallIcon sx={IconStyle} />
          </IconBox>
          <ItemContent>{`${stageSize}m^2`}</ItemContent>
        </Item>
        <Item type='half'>
          <IconBox>
            <PeopleIcon sx={IconStyle} />
          </IconBox>
          <ItemContent>{`${targetAge}대 ${targetGender} ${targetMinCount}인 이상`}</ItemContent>
        </Item>
        <Item type='half'>
          <IconBox>
            <LocalAtmIcon sx={IconStyle} />
          </IconBox>
          <ItemContent>{`${pay}원 이상`}</ItemContent>
        </Item>
      </Line>
      <Line>
        
        <Item type='half'>
          <IconBox>
            <MicExternalOnIcon sx={IconStyle} />
          </IconBox>
          <ItemContent>{`${showCount}회 이상`}</ItemContent>
        </Item>
        <Item type='half'>
          <IconBox>
            <LocationOnIcon sx={IconStyle} />
          </IconBox>
          <ItemContent>{stageType}</ItemContent>
        </Item>
      </Line>
    </Box>
  );
};

export default StageDetailInfoBox;