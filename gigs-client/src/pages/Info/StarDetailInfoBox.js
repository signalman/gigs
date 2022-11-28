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
  editable,
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
      <DetailInfoItem Icon={HeadsetMicIcon} onEdit={openEditGenresDialog} editable={editable} >{genres?.length > 0 ? (genres?.map(genre => genre).join(', ')) : '데이터를 추가해주세요.'}</DetailInfoItem>
      <DetailInfoItem Icon={PeopleIcon} onEdit={openEditMemberDialog} editable={editable} >{(gender && (memberNumber || Number(memberNumber) === 0)) ? `${gender} ${memberNumber}인` : '데이터를 추가해주세요.'}</DetailInfoItem>
      <DetailInfoItem Icon={LocationOnIcon} onEdit={openEditStageTypesDialog} editable={editable} >{stageTypes?.length > 0 ? stageTypes?.map(stageType => stageType).join(', ') : '데이터를 추가해주세요.'}</DetailInfoItem>
      <DetailInfoItem Icon={MicExternalOnIcon} editable={false} >{`${showCount}회 이상`}</DetailInfoItem>
    </Box>
  );
};

export default StarDetailInfoBox;