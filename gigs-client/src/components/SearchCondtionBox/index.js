import styled from '@emotion/styled';
import { Box } from '@mui/material';
import React from 'react';
import HostConditionContent from './HostConditionContent';
import StarConditionContent from './StarConditionContent';

const Container = styled(Box)((props) => ({
  width: '200px',
}));

const SearchConditionBox = ({
  isStar,
}) => {
  return (
    <Container>
      <Box sx={{ height: '100px' }} />
      {isStar ? (
        <StarConditionContent />
      ) : (
        <HostConditionContent />
      )}
    </Container>
  );
};

export default SearchConditionBox;