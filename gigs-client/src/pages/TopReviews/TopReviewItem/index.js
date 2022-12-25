import styled from '@emotion/styled';
import { Box, Rating } from '@mui/material';
import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { COLOR } from '../../../utils/Constants';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import {useNavigate} from 'react-router-dom';

const Container = styled(Box)((props) => ({
  position: 'relative',
  width: '1000px',
  height: '300px',
  boxShadow: `2px 2px 2px ${COLOR.grey}`,
  '::after': {
    content: "''",
    position: 'absolute',
    top: 0,
    left: 0,
    width: '1000px',
    height: '300px',
    zIndex: 50,
    backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.2) 0%, rgba(255,255,255,1) 80%, rgba(255,255,255,1) 20%)`,
  }
}));

const Content = styled(Box)((props) => ({
  width: '500px',
  height: '100%',
  position: 'absolute',
  top: 0, right: 0,
  zIndex: 100,
  color: COLOR.blacky,
}));

const NameBox = styled(Box)((props) => ({
  width: '100%',
  height: '70px',
  userSelect: 'none',
  fontSize: '35px',
  fontWeight: 'bold',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'flex-end',
}));

const RatingBox = styled(Box)((props) => ({
  display: 'flex',
  height: '25px',
  width: '125px',
  alignItems: 'center',
}));

const ContentBox = styled(Box)((p) => ({
  boxSizing: 'border-box',
  padding: '5px',
  width: '100%',
  height: '100px',
  overflow: 'hidden',
  fontStyle: 'italic',
}));

const ButtonBox = styled(Box)((props) => ({
  width: '100%',
  height: '100px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const MoreButton = styled(ReadMoreIcon)((props) => ({
  width: '40px',
  height: '40px',
  cursor: 'pointer',
  transition: '.5s all ease',

  ':hover': {
    width: '60px',
    height: '60px',
    animationDuration: '2s',
    animationName: 'color-change',
    animationIterationCount: 'infinite',

    '@keyframes color-change': {
      from: {
        color: COLOR.blacky,
        transform: 'translate(0, 0)',
      },
      '50%': {
        color: COLOR.main,
        transform: 'translate(0, -5px)',
      },
      to: {
        color: COLOR.blacky,
        transform: 'translate(0, 0)',
      }
    }
  }
}));

const TopReviewItem = ({
  review,
}) => {
  const {role, roleId, name, repImg, content, score} = review;

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${role === 'role_star' ? 'stars' : 'stages'}/${roleId}`);
  }

  return (
    <Container>
      <img src={repImg} alt='asdf' width='1000px' height='300px' style={{ objectFit: 'cover',}}/>
      <Content>
        <NameBox>{name}</NameBox>
        <RatingBox>
          <Rating
            sx={{ width: `125px` }}
            emptyIcon={<StarBorderIcon sx={{ width: `25px`, height: `25px` }}></StarBorderIcon>}
            icon={<StarIcon sx={{ width: `25px`, height: `25px` }}></StarIcon>}
            value={Number(score)} precision={0.5} readOnly
          />
        </RatingBox>
        <ContentBox>{content}</ContentBox>
        <ButtonBox>
          <MoreButton onClick={handleClick} />
        </ButtonBox>
      </Content>
    </Container>
  );
};

export default TopReviewItem;