import { Box, styled, Typography } from '@mui/material';
import React from 'react';
import PeopleIcon from '@mui/icons-material/People';
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

const StarDetailInfoBox = ({
  detailInfo,
}) => {
  const {
    genres,
    gender,
    memberNumber,
    stageTypes,
    showCount,
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
            <HeadsetMicIcon sx={IconStyle} />
          </IconBox>
          <ItemContent>{genres?.map(genre => genre.genreName).join(', ')}</ItemContent>
        </Item>
        <Item type='half'>
          <IconBox>
            <PeopleIcon sx={IconStyle} />
          </IconBox>
          <ItemContent>{`${gender} ${memberNumber}인`}</ItemContent>
        </Item>
        <Item type='half'>
          <IconBox>
            <LocationOnIcon sx={IconStyle} />
          </IconBox>
          <ItemContent>{stageTypes?.map(stageType => stageType.stageTypeName).join(', ')}</ItemContent>
        </Item>
      </Line>

      <Line>
        <Item type='half'>
          <IconBox>
            <MicExternalOnIcon sx={IconStyle} />
          </IconBox>
          <ItemContent>{`${showCount}회 이상`}</ItemContent>
        </Item>
      </Line>
    </Box>
  );
};

export default StarDetailInfoBox;