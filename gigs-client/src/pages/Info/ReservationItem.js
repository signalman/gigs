import styled from '@emotion/styled';
import { Box, Grid } from '@mui/material';
import React from 'react';
import { COLOR } from '../../utils/Constants';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

const wrapperStyle = {
  width: '96px', height: '96px',
  m: '10px', p: '2px',
  position: 'relative',
  borderRadius: '5px',
  backgroundColor: `${COLOR.main}40`,
  cursor: 'pointer',
  zIndex: 0,
  transition: '.25s ease',
  "&:hover": {
    backgroundColor: `${COLOR.main}80`,
  }
}

const DeleteIcon = styled(RemoveCircleIcon)((props) => ({
  position: 'absolute',
  top: -8, right: -8,
  width: '16px', height: '16px',
  zIndex: 100,
  transition: '.25s ease',
  "&:hover": {
    top: -10, right: -10,
  width: '20px', height: '20px',
  }
}));

const ReservationItem = ({
  data,
  editable,
}) => {
  const { startDate, startTime, endTime, genres } = data;

  return (
    <Grid item>
      <Box sx={wrapperStyle} onClick={(() => {console.log("ITEM")})} >
        {/* <Box sx={{ textAlign: 'center', fontSize: '9px', color: COLOR.blacky }} >{startDate}</Box> */}
        <Box sx={{ textAlign: 'center', fontSize: '12px' }} >{startTime} 부터</Box>
        <Box sx={{ textAlign: 'center', fontSize: '12px', mb: '5px' }} >{endTime} 까지</Box>
        {genres?.map(genre => (
          <Box key={genre} sx={{ textAlign: 'center', fontSize: '14px', fontWeight: 'bold'}}>{genre}</Box>
        ))}
        {editable ? (
          <DeleteIcon onClick={(e) => {e.stopPropagation(); console.log('DELETE')}} />
        ) : (<></>)}
      </Box>
    </Grid>
  );
};

export default ReservationItem;