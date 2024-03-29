import styled from '@emotion/styled';
import { Box, Rating } from '@mui/material';
import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { COLOR, IMG } from '../../../utils/Constants';
import DefaultHostImage from '../../../images/default_host.jpg';
import DefaultStarImage from '../../../images/default_star.jpg';
import {useNavigate} from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FindInPageIcon from '@mui/icons-material/FindInPage';

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
    backgroundImage: `linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 90%, rgba(255,255,255,1) 10%)`,
  }
}));

const Content = styled(Box)((props) => ({
  width: '400px',
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

const MoreButton = styled(FindInPageIcon)((props) => ({
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

const roleIconStyle = {
  position: 'absolute',
  top: 0,
  right: 0,
  zIndex: 150,
  width: '30px',
  height: '30px',
  color: `${COLOR.main}`,
};

const NoImageBox = styled(Box)((props) => ({
  position:'absolute',
  top: '10px', left: '10px',
  color: COLOR.whity,
  fontWeight: 'bold',
  backgroundColor: '#00000080'
}));

const TopReviewItem = ({
  review,
}) => {
  const {toRole, toRoleId, toName, toRepImg, content, score} = review;

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${toRole === 'role_star' ? 'stars' : 'stages'}/${toRoleId}`);
  }

  return (
    <Container>
      <img src={toRepImg ? IMG(toRepImg) : (toRole === 'role_star' ? DefaultStarImage : DefaultHostImage)} alt='asdf' width='1000px' height='300px' style={{ objectFit: 'cover',}}/>
      <Content>
        <NameBox>{toName}</NameBox>
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
        {toRole === 'role_star' ? (
          <PersonIcon sx={roleIconStyle} />
        ) : (
          <LocationOnIcon sx={roleIconStyle} />
        )}
      </Content>
      {Boolean(toRepImg) || 
        <NoImageBox>
          * 대표이미지가 등록되지 않아 표시되는 기본 이미지입니다.
        </NoImageBox>
      }
      
    </Container>
  );
};

export default TopReviewItem;