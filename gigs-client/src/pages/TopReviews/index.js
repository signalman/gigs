import styled from '@emotion/styled';
import { Box } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import useErrorPage from '../../hooks/useErrorPage';
import { getTopReviews } from '../../utils/Api';
import { COLOR } from '../../utils/Constants';
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

const NoReviews = styled(Box)((props) => ({
  width: '100%',
  height: '500px',
  lineHeight: '500px',
  textAlign: 'center',
  color: COLOR.grey,
  fontSize: '30px',
  fontWeight: 'bold',
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
      {top10Reviews?.length === 0 ? (
        <NoReviews>
          리뷰가 단 하나도 없습니다.
        </NoReviews>
      ) : (
        top10Reviews?.map(review => (
          <TopReviewItem review={review} />
        ))
      )}

      {}
    </Container>
  );
};

export default TopReviews;