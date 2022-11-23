import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Card, Box, styled, CardMedia,
    CardContent, Rating, Typography
 } from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import PeopleIcon from '@mui/icons-material/People';
import MicExternalOnIcon from '@mui/icons-material/MicExternalOn';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import PhotoSizeSelectSmallIcon from '@mui/icons-material/PhotoSizeSelectSmall';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { DEV } from '../../utils/Constants';
import StageDummyImg from '../../images/stage_tmp.jpg';

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
  // overflow: 'hidden',
}));

const IconBox = styled(Box)((p) => ({
  display: "flex",
  height: "37.5px",
  width: "37.5px",
  justifyContent: 'center',
  alignItems: 'center',
}));

const Content = styled(Box)((props) => ({
  width: '232.5px',
  height: '275.px',
  fontSize: props.fontSize || '14px',
}));


function StageCard({
  cardData,
}) {
  const {
    hostId,
    name,
    score,
    address,
    stageSize,
    openTime,
    closeTime,
    showCount,
    pay,
    stageImgUrl,
    stageType,
    reviewCount,
    targetAge,
    targetGender,
    targetMinCount,
  } = cardData;

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
      onClick={() => navigate('/stages/'+hostId)}
    >
      <CardMedia
        component="img"
        height="225"
        image={DEV ? StageDummyImg : stageImgUrl}
        alt="stages"
      />
    
      <Line>
        <Item type="half" sx={{ pl: "20px", }} >
          <Typography>{name}</Typography>
        </Item>
        <Item type="half" sx={{ justifyContent: 'end', pr: "20px" }}>
          <Rating
            sx={{ width: `75px` }}
            emptyIcon={<StarBorderIcon sx={{ width: `15px`, height: `15px` }}></StarBorderIcon>}
            icon={<StarIcon sx={{ width: `15px`, height: `15px` }}></StarIcon>}
            defaultValue={score} precision={0.1} readOnly
          />
          <Typography fontSize="11px">({reviewCount})</Typography>
        </Item>
      </Line>
      
      <Line>
        <Item sx={{ px: '15px' }}>
          <IconBox>
            <MapIcon sx={{ width: "20px", height: "20px", }} />
          </IconBox>
          <Content>{`${address.siDo} ${address.siGun} ${address.road} ${address.detail}`}</Content>
        </Item>
      </Line>
      
      <Line>
        <Item type="half" sx={{ px: '15px' }}>
          <IconBox>
            <PhotoSizeSelectSmallIcon sx={{ width: '20px', height: '20px', }} />
          </IconBox>
          <Typography fontSize=".9rem">{stageSize}m^2</Typography>
        </Item>
        <Item type="half" sx={{ px: '15px' }}>
          <IconBox>
            <PeopleIcon sx={{ width: '20px', height: '20px', }} />
          </IconBox>
          <Typography fontSize=".8rem">{targetAge}대 {targetGender} {targetMinCount}인 이상</Typography>
        </Item>
      </Line>

      <Line>
        <Item type="half" sx={{ px: '15px' }}>
          <IconBox>
            <AccessTimeIcon sx={{ width: '20px', height: '20px', }} />
          </IconBox>
          <Typography fontSize=".8rem">{openTime} ~ {closeTime}</Typography>
        </Item>
        <Item type="half" sx={{ px: '15px' }}>
          <IconBox>
            <MicExternalOnIcon sx={{ width: '20px', height: '20px', }} />
          </IconBox>
          <Typography fontSize=".9rem">{showCount}회 이상</Typography>
        </Item>
      </Line>

      <Line>
        <Item type="half" sx={{ px: '15px' }}>
          <IconBox>
            <LocalAtmIcon sx={{ width: '20px', height: '20px', }} />
          </IconBox>
          <Typography fontSize=".9rem">{pay}원 이상</Typography>
        </Item>
        <Item type="half" sx={{ px: '15px' }}>
          <IconBox>
            <LocationOnIcon sx={{ width: '20px', height: '20px', }} />
          </IconBox>
          <Typography fontSize=".9rem">{stageType}</Typography>
        </Item>
      </Line>
    </Card>
  )
}

export default StageCard;