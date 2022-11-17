import styled from '@emotion/styled';
import { Box } from '@mui/material';
import React from 'react';
import MiniProfile from './MiniProfile';
import {COLOR} from '../../utils/Constants';

const DateBox = styled(Box)((props) => ({
  position: 'absolute',
  top: 0,
  right: 0,
  width: '100px',
  height: '50px',
  lineHeight: '50px',
  textAlign: 'center',
  fontSize: '14px',
  color: COLOR.grey,
}));

const MyHistoryItem = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '50px',
        lineHeight: '50px',
        borderBottom: '.5px dotted black',
        display: 'flex',
        position: 'relative',
      }}
    >
      <MiniProfile />에서
      <MiniProfile />가 공연
      <DateBox>2022-11-16</DateBox>
    </Box>
  );
};

export default MyHistoryItem;