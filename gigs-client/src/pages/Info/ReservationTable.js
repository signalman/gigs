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
  editable,
}) => {

  return (
    <Grid container sx={{ width: '480px', boxShadow: '0 0 4px black', backgroundColor: 'white', minHeight: '380px' }}>
      {timeTable?.map((item) => (
        <ReservationItem key={`${item.date} ${item.startTime}`} editable={editable} data={item} />
      ))}
    </Grid>
  );
};

export default ReservationTable;