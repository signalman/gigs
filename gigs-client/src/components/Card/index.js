import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Card as MuiCard, CardMedia, styled, CardContent, Rating ,Box, Typography} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { COLOR, IMG, SYMBOL } from '../../utils/Constants';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import StarCardContent from './StarCardContent';
import HostCardContent from './HostCardContent';

const cardStyle = {
  width: "300px",
  borderRadius: "50px",
  boxShadow: "0 2px 4px #808080",
  cursor: "pointer",
  transition: 'ease-in .1s',
  ":hover": {
    transform: 'translate(0, -10px)',
    boxShadow: `0 10px 6px ${COLOR.grey}`,
  }
};

const Body = styled(CardContent)((props) => ({
  padding: 0,
  width: '100%',
  boxSizing: 'border-box',
  paddingLeft: '20px',
  paddingRight: '20px',
}));

const Title = styled(Box)((props) => ({
  width: '100%',
  height: '50px',
  lineHeight: '50px',
  position: 'relative',
}));

const RatingBox = styled(Box)((props) => ({
  display: 'flex',
  position: 'absolute',
  right: 0, top: 0,
  height: '50px',
  width: '100px',
  alignItems: 'center',
}));

function Card({
  target,
  card,
}) {
  const isStar = target === SYMBOL.star;

  const {id, imgUrl, name, avgScore, reviewCount} = card;

  const content =
    isStar ?
      {memberNumber: card.memberNumber, gender: card.gender, showCount: card.showCount, genres: card.genres, starStageTypes: card.starStageTypes} :
      {address: card.address,
        stageSize: card.stageSize,
        showCount: card.showCount,
        pay: card.pay,
        stageType: card.stageType,
        targetAge: card.targetAge,
        targetGender: card.targetGender,
        targetMinCount: card.targetMinCount,};

  const navigate = useNavigate();

  return (
    <MuiCard sx={cardStyle} onClick={() => navigate(`/${isStar ? 'stars' : 'stages'}/${id}`)} >
      {imgUrl ? (
        <CardMedia component="img" height="225" image={IMG(imgUrl)} alt="stars" />
      ) : (
        <Box sx={{ height: '225px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
          {isStar ? <AccountCircleIcon sx={{ width: '100px', height: '100px', color: COLOR.grey, }} /> : <InsertPhotoIcon sx={{ width: '100px', height: '100px', color: COLOR.grey, }} />}
          
        </Box>
      )}

      <Body>
        <Title>
          {name}
          <RatingBox>
            <Rating
              sx={{ width: `75px` }}
              emptyIcon={<StarBorderIcon sx={{ width: `15px`, height: `15px` }}></StarBorderIcon>}
              icon={<StarIcon sx={{ width: `15px`, height: `15px` }}></StarIcon>}
              value={Number(avgScore)} precision={0.1} readOnly
            />
            <Typography fontSize="11px">({reviewCount})</Typography>
          </RatingBox>
        </Title>
        {isStar ? <StarCardContent content={content} /> : <HostCardContent content={content} />}
      </Body>
    </MuiCard>
  )
}

export default Card;