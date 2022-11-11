import { Box, Grid } from '@mui/material';
import React from 'react';

const ReservationItem = ({
  data,
}) => {
  const { date, startTime, endTime } = data;

  return (
    <Grid item>
      <Box sx={{ width: '98px', height: '98px', border: '1px solid black', m: '10px' }} >
        <Box>{date}</Box>
        <Box>{startTime}</Box>
        <Box>{endTime}</Box>
      </Box>
    </Grid>
  );
};

export default ReservationItem;