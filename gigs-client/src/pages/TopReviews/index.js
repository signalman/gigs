import styled from '@emotion/styled';
import { Box } from '@mui/material';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import StageImg from '../../images/stage_tmp.jpg';
import StarImg from '../../images/star_tmp.jpg';
import TopReviewItem from './TopReviewItem';

const createDummy = (() => {
  let reviewId = 0;
  return (score, content, createdAt, role, name='카페 안녕') => {
    const newReview = {
      reviewId,
      roleId: 13,
      role,
      name,
      repImg: role === 'role_host' ? StageImg : StarImg,
      content,
      score,
      createdAt,
    };
    reviewId++;
    return newReview;
  }
})();

const dummy = [
  createDummy(1, '진짜 별로예요', moment(), 'role_host'),
  createDummy(5, '최고예요', moment().add('-1', 'd'), 'role_host'),
  createDummy(5, '최고였어요!! 엄청 친절하시고, 손님들도 착하고, 다시 또 와서 공연하고 싶네요', moment(), 'role_host'),
  createDummy(4, '이런 가수가 있을 줄이야...', moment(), 'role_star', '박상연'),
];

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



const TopReviews = ({

}) => {
  const [top10Reviews, setTop10Reviews] = useState([]);

  const getReviews = useCallback(async () => {
    // content 가 있는 애들만 데이터로 받아야 함

    // 임시
    const data = dummy.sort((a, b) => a.score === b.score ? b.createdAt - a.createdAt : b.score - a.score).slice(0, 10);
  
    setTop10Reviews(data);
  }, []);

  useEffect(() => {
    getReviews();
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