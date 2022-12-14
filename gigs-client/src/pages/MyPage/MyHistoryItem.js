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

const MyHistoryItem = ({
  host,
  star,
  date,
  status,
}) => {
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
      <MiniProfile width='200px' name={host.name} repImg={host.repImg} />에서
      <MiniProfile width='200px' name={star.name} repImg={star.repImg} />가 공연
      <DateBox>{date}</DateBox>
    </Box>
  );
};

export default MyHistoryItem;