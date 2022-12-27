import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import ConditionItem from '../ConditionItem';
import DateCondition from './DateCondition';
import AddressCondition from './AddressCondition';
import GenreCondition from '../ConditionItem/GenreCondition';
import StageTypeCondition from '../ConditionItem/StageTypeCondition';
import NameCondition from '../ConditionItem/NameCondition';
import moment from 'moment';

const Container = styled(Box)((props) => ({
  width: '100%',
}));

const HostConditionContent = ({
  generalConditions,
  applyChildConditions,
  onChangeGenre,
  onChangeStageType,
}) => {
  console.log('host render');
  const [hostConditions, setHostConditions] = useState({
    startDate: moment().format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD'),
    siDo: '전체 지역',
    siGunGu: '-',
    selectedGenres: [],
    selectedStageTypes: [],
  });

  // 처음 렌더링 될 때 hostCondtions 를 공통 conditions 에 적용시킴
  useEffect(() => {
    console.log('apply');
    applyChildConditions(hostConditions);
  }, [hostConditions]);

  /**
   *  날짜 조작
   */
  const handleChangeStartDate = (data) => {
    console.log('start: ' + data);
    setHostConditions(prev => ({...prev, startDate: data}));
  };

  const handleChangeEndDate = (data) => {
    console.log('end: ' + data);
    setHostConditions(prev => ({...prev, endDate: data}));
  };

  /**
   * 주소 조작
   */
  const handleChangeSiDo = (e) => {
    setHostConditions({...hostConditions, siDo: e.target.value, siGunGu: '-'});
  };

  const handleChangeSiGunGu = (e) => {
    setHostConditions({...hostConditions, siGunGu: e.target.value});
  }



  return (
    <Container>
      <ConditionItem title="날짜">
        <DateCondition onChangeStartDate={handleChangeStartDate} onChangeEndDate={handleChangeEndDate} />
      </ConditionItem>

      <ConditionItem title="주소">
        <AddressCondition conditions={hostConditions} onChangeSiDo={handleChangeSiDo} onChangeSiGunGu={handleChangeSiGunGu} />
      </ConditionItem>

      <ConditionItem title="선호 장르">
        <GenreCondition conditions={generalConditions} onChangeGenre={onChangeGenre} />
      </ConditionItem>

      <ConditionItem title="장소 종류">
        <StageTypeCondition conditions={generalConditions} onChangeStageType={onChangeStageType} />
      </ConditionItem>

      <ConditionItem title="장소 이름">
        <NameCondition />
      </ConditionItem>
    </Container>
  );
};

export default HostConditionContent;