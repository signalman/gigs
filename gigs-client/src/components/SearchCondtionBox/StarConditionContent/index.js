import styled from '@emotion/styled';
import { Box } from '@mui/material';
import React from 'react';
import GenreCondition from '../ConditionItem/GenreCondition';
import StageTypeCondition from '../ConditionItem/StageTypeCondition';
import NameCondition from '../ConditionItem/NameCondition';
import ConditionItem from '../ConditionItem';

const Container = styled(Box)((props) => ({
  width: '100%',
}));

const StarConditionContent = ({
  generalConditions,
  applyChildConditions,
  onChangeGenre,
  onChangeStageType,
  onChangeName,
}) => {
  return (
    <Container>
      <ConditionItem title="선호 장르">
        <GenreCondition conditions={generalConditions} onChangeGenre={onChangeGenre} />
      </ConditionItem>

      <ConditionItem title="장소 종류">
        <StageTypeCondition conditions={generalConditions} onChangeStageType={onChangeStageType} />
      </ConditionItem>

      <ConditionItem title="장소 이름">
        <NameCondition conditions={generalConditions} onChangeName={onChangeName} />
      </ConditionItem>
    </Container>
  );
};

export default StarConditionContent;