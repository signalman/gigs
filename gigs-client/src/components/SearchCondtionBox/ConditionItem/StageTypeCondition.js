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
  onChangeStageType,
}) => {
  const {selectedStageTypes} = conditions;

  return (
    <Container>
      {STAGE_TYPES.map(item => (
        <CategoryItem selected={selectedStageTypes[item]} selectItem={onChangeStageType}>{item}</CategoryItem>
      ))}
    </Container>
  );
};

export default StageTypeCondition;