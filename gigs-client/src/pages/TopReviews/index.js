import styled from '@emotion/styled';
import { Box } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import useErrorPage from '../../hooks/useErrorPage';
import { getTopReviews } from '../../utils/Api';
import TopReviewItem from './TopReviewItem';

const Container = styled(Box)((props) => ({
  boxSizing: 'border-box',
  width: '1200px',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: '50px',
  marginBottom: '50px',
  rowGap: '50px',
}));



const TopReviews = () => {
  const toError = useErrorPage();

  const [top10Reviews, setTop10Reviews] = useState([]);

  const getReviews = useCallback(async () => {
    try {
      const response = await getTopReviews();
      console.log('# 탑 리뷰들');
      console.log(response);

      setTop10Reviews(response.data.content);
    } catch(err) {
      const statusCode = err.response.status;
      if(statusCode === 500) {
        toError.serverError();
      }
    }
  }, []);

  useEffect(() => {
    getReviews();
    // eslint-disable-next-line 
  }, []);

  return (
    <Container>
      {top10Reviews?.map(review => (
        <TopReviewItem review={review} />
      ))}
    </Container>
  );
};

export default TopReviews;