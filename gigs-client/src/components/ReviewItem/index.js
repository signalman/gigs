import { Box, Rating } from '@mui/material';
import React from 'react';
import StarDummyImg from '../../images/star_tmp.jpg';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import styled from '@emotion/styled';
import MiniProfile from '../../pages/MyPage/MiniProfile';
import { COLOR } from '../../utils/Constants';

const Container = styled(Box)((props) => ({
  boxSizing: 'border-box',
  width: '100%',
  paddingLeft: '10px',
  paddingRight: '10px',
  paddingBottom: '10px',

  ":nth-of-type(even)": {
    backgroundColor: COLOR.whity,
  }
}));

const Header = styled(Box)((props) => ({
  height: '50px',
  display: 'flex',
  position: 'relative',
}));

const RatingBox = styled(Box)((props) => ({
  position: 'absolute',
  height: '50px',
  top: 0,
  right: 0,
  display: 'flex',
  alignItems: 'center',
}));

const Content = styled(Box)((props) => ({
  width: '100%',
  fontSize: '16px',
}));

const Footer = styled(Box)((props) => ({
  width: '100%',
  textAlign: 'end',
  fontSize: '14px',
  color: COLOR.grey,
}));

const ReviewItem = ({
  review,
}) => {
  const {reviewId, fromRoleId, fromRole, fromName, fromRepImg, content, score, createdAt} = review;

  return (
    <Container>
      <Header>
        <MiniProfile width='300px' name={fromName} repImg={fromRepImg} starId={fromRole === 'role_star' ? fromRoleId : null} hostId={fromRole === 'role_host' ? fromRoleId : null} />
        <RatingBox>
          <Rating
            sx={{ width: `100px`, height: '20px', }}
            emptyIcon={<StarBorderIcon sx={{ width: `20px`, height: `20px` }}></StarBorderIcon>}
            icon={<StarIcon sx={{ width: `20px`, height: `20px` }}></StarIcon>}
            value={score} precision={0.1} readOnly
          />
        </RatingBox>
      </Header>
      {/* 리뷰 내용 */}
      <Content>
        {content}
      </Content>
      <Footer>
        {createdAt.fromNow()}
      </Footer>
    </Container>
  );
};

export default ReviewItem;