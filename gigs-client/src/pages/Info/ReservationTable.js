import { Grid } from '@mui/material';
import React from 'react';
import ReservationItem from './ReservationItem';

const tmp_data = {
  date: "2022-11-10",
  startTime: "13:53",
  endTime: "15:53",
}

const ReservationTable = ({
  timeTable,
}) => {

  return (
    <Grid container sx={{ width: '480px', }}>
      {timeTable?.map((item) => (
        <ReservationItem key={`${item.date} ${item.startTime}`} data={item} />
      ))}
    </Grid>
  );
};

export default ReservationTable;