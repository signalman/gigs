import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Card, CardMedia, styled, CardContent, Rating ,Box, Typography} from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import PeopleIcon from '@mui/icons-material/People';
import MicExternalOnIcon from '@mui/icons-material/MicExternalOn';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { DEV, ENUM } from '../../utils/Constants';
import StarDummyImg from '../../images/star_tmp.jpg';

const Line = styled(CardContent)((p) => ({
  height: "37.5px",
  display: 'flex',
  padding: 0,
}));

const Item = styled(Box)((p) => ({
  display: "flex",
  height: "100%",
  width: p.type === "half" ? "50%" : "100%",
  alignItems: 'center',
}));

const IconBox = styled(Box)((p) => ({
  display: "flex",
  height: "37.5px",
  width: "37.5px",
  justifyContent: 'center',
  alignItems: 'center',
}));

function StarCard({
  card,
}) {
  const {
    starId,
    starImgUrl,
    starName,
    avgScore,
    reviewCount,
    address,
    memberNumber,
    gender,
    showCount,
    genres,
    starStageTypes,
  } = card;

  const navigate = useNavigate();

  return (
    <Card
      sx={{
        width: "300px",
        borderRadius: "50px",
        boxShadow: "0 4px 4px #808080",
        cursor: "pointer",
        transition: 'ease-in .1s',
        ":hover": {
          transform: 'translate(0, -10px)',
        }
      }}
      onClick={() => navigate('/stars/'+starId)}
    >
      <CardMedia
        component="img"
        height="225"
        image={DEV ? StarDummyImg : starImgUrl}
        alt="stars"
      />

      <Line>
        <Item type="half" sx={{ pl: "20px", }} >
          <Typography>{starName}</Typography>
        </Item>
        <Item type="half" sx={{ justifyContent: 'end', pr: "20px" }}>
          <Rating
            sx={{ width: `75px` }}
            emptyIcon={<StarBorderIcon sx={{ width: `15px`, height: `15px` }}></StarBorderIcon>}
            icon={<StarIcon sx={{ width: `15px`, height: `15px` }}></StarIcon>}
            value={Number(avgScore)} precision={0.1} readOnly
          />
          <Typography fontSize="11px">({reviewCount})</Typography>
        </Item>
      </Line>
            
      <Line>
        <Item type="half" sx={{ px: '15px' }}>
          <IconBox>
            <PeopleIcon sx={{ width: '20px', height: '20px', }} />
          </IconBox>
          <Typography fontSize="12px">{memberNumber}인 {ENUM[gender]}</Typography>
        </Item>
        <Item type="half" sx={{ px: '15px' }}>
          <IconBox>
            <MicExternalOnIcon sx={{ width: '20px', height: '20px', }} />
          </IconBox>
          <Typography fontSize="12px">{showCount}회</Typography>
        </Item>
      </Line>

      <Line>
        <Item sx={{ px: '15px' }}>
          <IconBox>
            <HeadsetMicIcon sx={{ width: "20px", height: "20px", }} />
          </IconBox>
          <Typography fontSize="12px">{genres?.reduce((prev, cur) => (prev + ` / ${ENUM[cur.genreName]}`), "").substring(3)}</Typography>
        </Item>
      </Line>

      <Line>
        <Item sx={{ px: '15px' }}>
          <IconBox>
            <LocationOnIcon sx={{ width: "20px", height: "20px", }} />
          </IconBox>
          <Typography fontSize="12px">{starStageTypes?.reduce((prev, cur) => (prev + ` / ${ENUM[cur.stageTypeName]}`), "").substring(3)}</Typography>
        </Item>
      </Line>
    </Card>
  )
}

export default StarCard;