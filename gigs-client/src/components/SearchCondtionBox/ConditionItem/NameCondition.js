import styled from '@emotion/styled';
import { Box, TextField, } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { GENRES } from '../../../utils/Constants';
import CategoryItem from '../../CategoryItem';

const Container = styled(Box)((props) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
}));

const NameCondition = ({
  conditions,
  onChangeName,
}) => {
  const {name} = conditions;

  return (
    <Container>
      <TextField
        sx={{ width: '160px' }}
        size='small'
        variant='outlined'
        InputProps={{ style: {fontSize: '12px',} }}
        placeholder='장소 이름을 검색해보세요.'
        value={name}
        onChange={onChangeName}
      />
    </Container>
  );
};

export default NameCondition;