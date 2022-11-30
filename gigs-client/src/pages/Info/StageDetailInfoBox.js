import { Box, } from '@mui/material';
import React from 'react';
import PhotoSizeSelectSmallIcon from '@mui/icons-material/PhotoSizeSelectSmall';
import PeopleIcon from '@mui/icons-material/People';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import MicExternalOnIcon from '@mui/icons-material/MicExternalOn';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { COLOR, ifNull } from '../../utils/Constants';
import DetailInfoItem from './DetailInfoItem';

const StageDetailInfoBox = ({
  detailInfo,
  openEditAreaDialog,
  openEditTargetDialog,
  openEditPayDialog,
  openEditStageTypeDialog,
  editable,
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
        width: `500px`,
        mx: '50px',
        backgroundColor: COLOR.whity,
      }}
    >
      <DetailInfoItem Icon={PhotoSizeSelectSmallIcon} onEdit={openEditAreaDialog} editable={editable} >{ifNull(stageSize, '', 'm^2')}</DetailInfoItem>
      <DetailInfoItem Icon={PeopleIcon} onEdit={openEditTargetDialog} editable={editable}>{((targetAge || Number(targetAge) === 0) && targetGender !== 'DEFAULT' && (targetMinCount || Number(targetMinCount) === 0)) ? `${targetAge}대 ${targetGender} ${targetMinCount}인 이상` : '데이터를 추가해주세요.'}</DetailInfoItem>
      <DetailInfoItem Icon={LocalAtmIcon} onEdit={openEditPayDialog} editable={editable}>{ifNull((pay), '', '원 이상')}</DetailInfoItem>
      <DetailInfoItem Icon={MicExternalOnIcon} editable={false}>{`${showCount}회 이상`}</DetailInfoItem>
      <DetailInfoItem Icon={LocationOnIcon} onEdit={openEditStageTypeDialog} editable={editable}>{ifNull(stageType)}</DetailInfoItem>
    </Box>
  );
};

export default StageDetailInfoBox;