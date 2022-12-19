import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { COLOR } from '../../utils/Constants';
import ReviewItem from '../ReviewItem';

const Container = styled(Box)((props) => ({
  width: '1200px',
  margin: '0 auto',
  marginTop: '50px',
  marginBottom: '50px',
}));

const Title = styled(Box)((props) => ({
  width: '100%',
  height: '50px',
  lineHeight: '50px',
  fontSize: '20px',
  fontWeight: 'bold',
  textIndent: '50px',
  borderBottom: `2px solid ${COLOR.blacky}`,
}));

const ReviewBox = ({
  reviewBoxRef,
  reviews,
}) => {
  return (
    <Container ref={reviewBoxRef} >
      <Title>
        리뷰
      </Title>
      {reviews?.map(review => (
        <ReviewItem key={review.reviewId} review={review} />
      ))}
      
    </Container>
  );
};

export default ReviewBox;