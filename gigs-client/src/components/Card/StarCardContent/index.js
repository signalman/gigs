import styled from '@emotion/styled';
import { Box } from '@mui/material';
import React from 'react';
import CardItem from '../CardItem';
import PeopleIcon from '@mui/icons-material/People';
import MicExternalOnIcon from '@mui/icons-material/MicExternalOn';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { ENUM } from '../../../utils/Constants';

const Container = styled(Box)((props) => ({
  width: '100%',
  display: 'flex',
  flexWrap: 'wrap',    
}));

const StarCardContent = ({
  content,
}) => {
  const {memberNumber, gender, showCount, genres, starStageTypes} = content;

  return (
    <Container>
      <CardItem type='half' Icon={PeopleIcon}>{gender === 'DEFAULT' ? '정보가 없습니다' : `${memberNumber}인 ${ENUM[gender]}`}</CardItem>
      <CardItem type='half' Icon={MicExternalOnIcon}>{showCount}회 공연</CardItem>
      <CardItem type='full' Icon={HeadsetMicIcon}>{genres?.length === 0 ? '정보가 없습니다' : genres?.reduce((prev, cur) => (prev + ` / ${ENUM[cur.genreName]}`), "").substring(3)}</CardItem>
      <CardItem type='full' Icon={LocationOnIcon}>{starStageTypes?.length === 0 ? '정보가 없습니다' : starStageTypes?.reduce((prev, cur) => (prev + ` / ${ENUM[cur.stageTypeName]}`), "").substring(3)}</CardItem>
    </Container>
  );
};

export default StarCardContent;