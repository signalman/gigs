import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import React from 'react';
import CardItem from '../CardItem';
import PeopleIcon from '@mui/icons-material/People';
import MicExternalOnIcon from '@mui/icons-material/MicExternalOn';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { ENUM } from '../../../utils/Constants';
import MapIcon from '@mui/icons-material/Map';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import PhotoSizeSelectSmallIcon from '@mui/icons-material/PhotoSizeSelectSmall';

const Container = styled(Box)((props) => ({
  width: '100%',
  display: 'flex',
  flexWrap: 'wrap',    
}));

const HostCardContent = ({
  content,
}) => {
  const {address, stageSize, showCount, pay, stageType, targetAge, targetGender, targetMinCount,} = content;

  return (
    <Container>
      <CardItem type='full' Icon={MapIcon}>{`${address?.siDo} ${address?.siGun} ${address?.road} ${address?.detail}`}</CardItem>
      <CardItem type='half' Icon={PhotoSizeSelectSmallIcon}>{stageSize}m^2</CardItem>
      <CardItem type='half' Icon={PeopleIcon}><Box>
            <Typography fontSize="12px">{targetAge}대 {ENUM[targetGender]}</Typography>
            <Typography fontSize="12px">{targetMinCount}인 이상</Typography>
          </Box></CardItem>
      <CardItem type='half' Icon={MicExternalOnIcon}>{showCount}회 이상</CardItem>
      <CardItem type='half' Icon={LocalAtmIcon}>{pay}원 이상</CardItem>
      <CardItem type='half' Icon={LocationOnIcon}>{ENUM[stageType]}</CardItem>
    </Container>
  );
};

export default HostCardContent;