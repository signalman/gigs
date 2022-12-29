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
  onDeletePost,
  editable,
  onClickPost,
}) => {
  const { postId, startTime, endTime, postGenres } = data;

  return (
    <Grid item>
      <Box sx={wrapperStyle} onClick={(() => onClickPost(postId))} >
        {/* <Box sx={{ textAlign: 'center', fontSize: '9px', color: COLOR.blacky }} >{startDate}</Box> */}
        <Box sx={{ textAlign: 'center', fontSize: '12px' }} >{startTime} 부터</Box>
        <Box sx={{ textAlign: 'center', fontSize: '12px', mb: '5px' }} >{endTime} 까지</Box>
        {postGenres?.map(genre => (
          <Box key={genre.postGenreId} sx={{ textAlign: 'center', fontSize: '14px', fontWeight: 'bold'}}>{genre.genreName}</Box>
        ))}
        {editable ? (
          <DeleteIcon onClick={(e) => {e.stopPropagation(); onDeletePost(postId); }} />
        ) : (<></>)}
      </Box>
    </Grid>
  );
};

export default ReservationItem;