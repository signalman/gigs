import { Box, Grid } from '@mui/material';
import React from 'react';
import { COLOR } from '../../utils/Constants';

const wrapperStyle = {
  width: '96px', height: '96px',
  m: '10px', p: '2px',
  borderRadius: '5px',
  backgroundColor: `${COLOR.main}40`,
  cursor: 'pointer',
  transition: '.25s ease',
  "&:hover": {
    backgroundColor: `${COLOR.main}80`,
  }
}

const ReservationItem = ({
  data,
}) => {
  const { startDate, startTime, endTime, genres } = data;

  return (
    <Grid item>
      <Box sx={wrapperStyle} >
        {/* <Box sx={{ textAlign: 'center', fontSize: '9px', color: COLOR.blacky }} >{startDate}</Box> */}
        <Box sx={{ textAlign: 'center', fontSize: '12px' }} >{startTime} 부터</Box>
        <Box sx={{ textAlign: 'center', fontSize: '12px', mb: '5px' }} >{endTime} 까지</Box>
        {genres?.map(genre => (
          <Box key={genre} sx={{ textAlign: 'center', fontSize: '14px', fontWeight: 'bold'}}>{genre}</Box>
        ))}
      </Box>
    </Grid>
  );
};

export default ReservationItem;