import styled from '@emotion/styled';
import { Box } from '@mui/material';
import React from 'react';
import HostConditionContent from './HostConditionContent';
import StarConditionContent from './StarConditionContent';

const Container = styled(Box)((props) => ({
  width: '1150px',
  margin: '0 auto',
}));

const SearchConditionBox = ({
  isStar,
}) => {
  return (
    <Container>
      {isStar ? (
        <StarConditionContent />
      ) : (
        <HostConditionContent />
      )}
    </Container>
  );
};

export default SearchConditionBox;