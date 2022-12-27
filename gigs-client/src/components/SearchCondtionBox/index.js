import styled from '@emotion/styled';
import { Box, Button } from '@mui/material';
import React, { useCallback, useState } from 'react';
import HostConditionContent from './HostConditionContent';
import StarConditionContent from './StarConditionContent';

const Container = styled(Box)((props) => ({
  width: '200px',
}));

const SearchButton = styled(Button)((props) => ({
  width: '150px',
  margin: '0 25px',
  fontSize: '16px',
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

  /**
   * 이름 조작
   */
  const handleChangeName = (e) => {
    setGeneralConditions({...generalConditions, name: e.target.value});
  };

  // 검색 버튼 클릭 시
  const handleClickSearchBtn = useCallback(() => {
    const {
      selectedStageTypes, selectedGenres, name,
      startDate, endDate, siDo, siGunGu,
    } = generalConditions;

    const stageTypes = [];
    for(const key in selectedStageTypes) {
      if(selectedStageTypes[key]) stageTypes.push(key);
    }

    const genres = [];
    for(const key in selectedGenres) {
      if(selectedGenres[key]) genres.push(key);
    }

    const newConditions = {
      name, genres, stageTypes,
      startDate, endDate,
    };

    // 주소 조건
    if(siDo !== '전체 지역') {
      newConditions.siDo = siDo;
      if(siGunGu !== '-') {
        newConditions.siGunGu = siGunGu;
      }
    }

    setConditions(newConditions);
    setProgress(true);
    fetchData(newConditions);
  }, [generalConditions, setConditions, fetchData]);

  return (
    <Container>
      <Box sx={{ height: '100px' }} />
      {isStar ? (
        <StarConditionContent />
      ) : (
        <HostConditionContent generalConditions={generalConditions} applyChildConditions={applyChildConditions} onChangeGenre={handleChangeGenre} onChangeStageType={handleChangeStageType} onChangeName={handleChangeName} />
      )}

      <SearchButton variant='contained' onClick={handleClickSearchBtn} >검색</SearchButton>
    </Container>
  );
};

export default SearchConditionBox;