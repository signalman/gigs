import { Box, Typography } from '@mui/material';
import React from 'react';
import { COLOR } from '../../utils/Constants';
import ReviewItem from '../ReviewItem';

const ReviewBox = ({
  reviewBoxRef,
}) => {
  return (
    <Box
      sx={{
        width: '1200px',
        m: '0 auto',
        mt: '50px',
        mb: '50px',
      }}
      ref={reviewBoxRef}
    >
      <Box
        sx={{
          width: '100%',
          height: '50px',
          lineHeight: '50px',
          fontSize: '20px',
          fontWeight: 'bold',
          textIndent: '50px',
          borderBottom: `1px solid ${COLOR.blacky}`,
        }}
      >
        리뷰
      </Box>
      <ReviewItem />
    </Box>
  );
};

export default ReviewBox;