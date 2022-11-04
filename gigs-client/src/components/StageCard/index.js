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


function StageCard({
  hostId,
  stageName,
  avgScore,
  address,
  stageSize,
  startTime,
  endTime,
  showCount,
  pay,
  stageImgUrl,
  genres,
  stageType,
  reviewCount,
  targetAge,
  targetGender,
  targetMinCount,
}) {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        width: "300px",
        height: "487.5px",
        border: "1.5px solid #808080",
        borderRadius: "50px",
        boxShadow: "0 4px 4px #808080",
        cursor: "pointer",
      }}
      onClick={() => navigate('/stages/'+hostId)}
    >
      <CardMedia
        component="img"
        height="225"
        image={DEV ? "img/stage_tmp.jpg" : stageImgUrl}
        alt="stages"
      />
    
      <Line>
        <Item type="half" sx={{ pl: "20px", }} >
          <Typography>{stageName}</Typography>
        </Item>
        <Item type="half" sx={{ justifyContent: 'end', pr: "20px" }}>
          <Rating
            sx={{ width: `75px` }}
            emptyIcon={<StarBorderIcon sx={{ width: `15px`, height: `15px` }}></StarBorderIcon>}
            icon={<StarIcon sx={{ width: `15px`, height: `15px` }}></StarIcon>}
            defaultValue={avgScore} precision={0.1} readOnly
          />
          <Typography fontSize=".7rem">({reviewCount})</Typography>
        </Item>
      </Line>
      
      <Line>
        <Item sx={{ px: '15px' }}>
          <IconBox>
            <MapIcon sx={{ width: "20px", height: "20px", }} />
          </IconBox>
          <Typography fontSize=".9rem">{`${address.addressName} ${address.cityName} ${address.countryName}`}</Typography>
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
          <Typography fontSize=".8rem">{startTime} ~ {endTime}</Typography>
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

      <Line>
          <Item sx={{ px: '15px' }}>
              <IconBox>
                  <HeadsetMicIcon sx={{ width: "20px", height: "20px", }} />
              </IconBox>
              <Typography fontSize=".9rem">{genres?.reduce((prev, cur) => (prev + ` / ${cur.genreName}`), "").substring(3)}</Typography>
          </Item>
      </Line>
    </Card>
  )
}

export default StageCard;