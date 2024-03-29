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

  const fullAddress = `${address?.siDo || ''} ${address?.siGun || ''} ${address?.road || ''} ${address?.detail || ''}`;

  return (
    <Container>
      <CardItem type='full' Icon={MapIcon}>{fullAddress}</CardItem>
      <CardItem type='half' Icon={PhotoSizeSelectSmallIcon}>{stageSize ? `${stageSize}m^2` : '정보가 없습니다'}</CardItem>
      <CardItem type='half' Icon={PeopleIcon}>
        {targetGender === 'DEFAULT' ? '정보가 없습니다' : (
          <Box>
            <Typography fontSize="12px">{targetAge}대 {ENUM[targetGender]}</Typography>
            <Typography fontSize="12px">{targetMinCount}인 이상</Typography>
          </Box>
        )}
      </CardItem>
      <CardItem type='half' Icon={MicExternalOnIcon}>{showCount}회 공연</CardItem>
      <CardItem type='half' Icon={LocalAtmIcon}>{pay ? `${pay}원 이상` : '정보가 없습니다'}</CardItem>
      <CardItem type='half' Icon={LocationOnIcon}>{stageType ? ENUM[stageType] : '정보가 없습니다'}</CardItem>
    </Container>
  );
};

export default HostCardContent;