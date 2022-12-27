import styled from '@emotion/styled';
import { Box, Button } from '@mui/material';
import React, { useState } from 'react';
import HostConditionContent from './HostConditionContent';
import StarConditionContent from './StarConditionContent';

const Container = styled(Box)((props) => ({
  width: '200px',
}));

const SearchConditionBox = ({
  isStar,
  fetchData,
  setConditions,
  setParentSort,
  setProgress,
}) => {
  const [generalConditions, setGeneralConditions] = useState({
    selectedGenres: {},
    selectedStageTypes: {},
    name: '',
  });

  console.log(generalConditions);

  // 하위 Conditions 반영
  const applyChildConditions = (conditions) => {
    setGeneralConditions({...generalConditions, ...conditions});
  };

  /**
   * 장르 조작
   */
  const handleChangeGenre = (genre) => {
    setGeneralConditions({...generalConditions, selectedGenres: {...generalConditions.selectedGenres, [genre]: !generalConditions.selectedGenres[genre]}});
  };

  /**
   * 장소 조작
   */
  const handleChangeStageType = (stageType) => {
    setGeneralConditions({...generalConditions, selectedStageTypes: {...generalConditions.selectedStageTypes, [stageType]: !generalConditions.selectedStageTypes[stageType]}});
  };

  return (
    <Container>
      <Box sx={{ height: '100px' }} />
      {isStar ? (
        <StarConditionContent />
      ) : (
        <HostConditionContent generalConditions={generalConditions} applyChildConditions={applyChildConditions} onChangeGenre={handleChangeGenre} onChangeStageType={handleChangeStageType} />
      )}

      <Button>df</Button>
    </Container>
  );
};

export default SearchConditionBox;