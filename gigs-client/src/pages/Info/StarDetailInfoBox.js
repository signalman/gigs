import { Box, styled, Typography } from '@mui/material';
import React from 'react';
import PeopleIcon from '@mui/icons-material/People';
import MicExternalOnIcon from '@mui/icons-material/MicExternalOn';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import { COLOR } from '../../utils/Constants';
import DetailInfoItem from './DetailInfoItem';

const StarDetailInfoBox = ({
  detailInfo,
  openEditGenresDialog,
  openEditMemberDialog,
  openEditStageTypesDialog,
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
        width: `500px`,
        mx: '50px',
        backgroundColor: COLOR.whity,
      }}
    >
      <DetailInfoItem Icon={HeadsetMicIcon} onEdit={openEditGenresDialog} >{genres?.map(genre => genre.genreName).join(', ')}</DetailInfoItem>
      <DetailInfoItem Icon={PeopleIcon} onEdit={openEditMemberDialog} >{`${gender} ${memberNumber}인`}</DetailInfoItem>
      <DetailInfoItem Icon={LocationOnIcon} onEdit={openEditStageTypesDialog} >{stageTypes?.map(stageType => stageType.stageTypeName).join(', ')}</DetailInfoItem>
      <DetailInfoItem Icon={MicExternalOnIcon} uneditable >{`${showCount}회 이상`}</DetailInfoItem>
    </Box>
  );
};

export default StarDetailInfoBox;