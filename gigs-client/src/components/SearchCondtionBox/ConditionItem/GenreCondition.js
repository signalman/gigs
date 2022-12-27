import styled from '@emotion/styled';
import { Box, } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { GENRES } from '../../../utils/Constants';
import CategoryItem from '../../CategoryItem';

const Container = styled(Box)((props) => ({
  width: '100%',
  display: 'flex',
  flexWrap: 'wrap',
}));

const GenreCondition = ({
  conditions,
  onChangeGenre,
}) => {
  const {selectedGenres} = conditions;

  return (
    <Container>
      {GENRES.map(item => (
        <CategoryItem selected={selectedGenres[item]} selectItem={onChangeGenre}>{item}</CategoryItem>
      ))}
    </Container>
  );
};

export default GenreCondition;