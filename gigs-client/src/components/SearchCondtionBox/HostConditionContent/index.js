import styled from '@emotion/styled';
import React from 'react';
import { Box } from '@mui/material';
import ConditionItem from '../ConditionItem';
import DateCondition from './DateCondition';
import AddressCondition from './AddressCondition';

const Container = styled(Box)((props) => ({
  width: '100%',
}));

const HostConditionContent = () => {
  

  return (
    <Container>
      <ConditionItem title="날짜">
        <DateCondition />
      </ConditionItem>

      <ConditionItem title="주소">
        <AddressCondition />
      </ConditionItem>
    </Container>
  );
};

export default HostConditionContent;