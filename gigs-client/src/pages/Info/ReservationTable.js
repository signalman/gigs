import { Grid } from '@mui/material';
import React from 'react';
import ReservationItem from './ReservationItem';

const ReservationTable = ({
  timeTable,
  onDeletePost,
  editable,
}) => {

  return (
    <Grid container sx={{ width: '480px', boxShadow: '0 0 4px black', backgroundColor: 'white', minHeight: '380px' }}>
      {timeTable?.map((item) => (
        <ReservationItem key={`${item.date} ${item.startTime}`} onDeletePost={onDeletePost} editable={editable} data={item} />
      ))}
    </Grid>
  );
};

export default ReservationTable;