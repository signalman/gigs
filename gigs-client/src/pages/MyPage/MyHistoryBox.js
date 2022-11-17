import { Box } from '@mui/material';
import React from 'react';
import MyHistoryItem from './MyHistoryItem';

const MyHistoryBox = () => {
  return (
    <Box sx={{ width: '100%' }}>
      <MyHistoryItem />
      <MyHistoryItem />
      <MyHistoryItem />
      <MyHistoryItem />
      <MyHistoryItem />
    </Box>
  );
};

export default MyHistoryBox;