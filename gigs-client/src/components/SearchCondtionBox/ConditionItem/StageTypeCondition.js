import styled from '@emotion/styled';
import { Box, } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { STAGE_TYPES } from '../../../utils/Constants';
import CategoryItem from '../../CategoryItem';

const Container = styled(Box)((props) => ({
  width: '100%',
  display: 'flex',
  flexWrap: 'wrap',
}));

const StageTypeCondition = ({
  conditions,
  onChangeStageTypes,
}) => {
  const [selectedStageTypes, setSelectedStageTypes] = useState({});

  // 장소 아이템 선택하면 장소 선택 표시
  const selectStageType = useCallback((genre) => {
    setSelectedStageTypes({...selectedStageTypes, [genre]: !selectedStageTypes[genre]});
  }, [selectedStageTypes]);

  return (
    <Container>
      {STAGE_TYPES.map(item => (
        <CategoryItem selected={selectedStageTypes[item]} selectItem={selectStageType}>{item}</CategoryItem>
      ))}
    </Container>
  );
};

export default StageTypeCondition;