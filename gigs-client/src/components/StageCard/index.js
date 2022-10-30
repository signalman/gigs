import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Card,Box,styled,CardMedia,
    CardContent,Rating,Divider
 } from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import PeopleIcon from '@mui/icons-material/People';
import MicExternalOnIcon from '@mui/icons-material/MicExternalOn';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import PhotoSizeSelectSmallIcon from '@mui/icons-material/PhotoSizeSelectSmall';

const FlexBoxA = styled(Box)((p) => ({
  display:"flex",
  justifyContent: 'space-between',
  alignItems:'center'
}));

const FlexBoxB = styled(Box)((p) => ({
  display:"flex",
  justifyContent: 'space-between',
  alignItems:'center'
}));

const RightBox = styled(Box)((p) => ({
  width : '200px',
  display:'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const LeftBox = styled(Box)((p) => ({
  width : '103px',
}));

function Types({genre,index,arr}) {
    return(
        <div>
            <b>{genre.genreName}</b>{arr.length-1 > index ? "/" : null}
        </div>
    );
}

function StageCard(props) {
  const navigate = useNavigate();
    return (
        <>
        <Card sx={{ width: 300 ,height: 500,border:0.1}} onClick={() => navigate('/stages/'+props.hostId)}>
      <CardMedia
        component="img"
        height="160"
        image={props.stageImgUrl}
        alt="stages"
      />
      <CardContent>
        <FlexBoxA>
        <Box sx={{fontSize:20,fontWeight:'bold'}}>
        {props.stageName}
        </Box>
        <Box>
        <Rating name="half-rating-read" defaultValue={props.avgScore} precision={0.5} readOnly />
        </Box>
        </FlexBoxA>
      </CardContent>

    <CardContent sx={{fontSize:13 ,textAlign:'center'}}>
        <FlexBoxB>
        <Box>
        <MapIcon></MapIcon>
        </Box>
        <RightBox>
        {props.stageAddress}
        </RightBox>
        </FlexBoxB>
    </CardContent>

    <CardContent sx={{fontSize:12}}>
        <FlexBoxB>
        <Box>
        <PhotoSizeSelectSmallIcon fontSize="medium"></PhotoSizeSelectSmallIcon>
        </Box>
        <Box>
        {props.stageSize} m^2 &nbsp;
        </Box>
        <Box sx={{width:'10px'}}>
        <PeopleIcon fontSize="medium"></PeopleIcon>
        </Box>
        <Box>
        {props.age} 살 이상
        </Box>
        <Box sx={{width:'30px'}}/>
        </FlexBoxB>
    </CardContent>

    <CardContent sx={{fontSize:12}}>
        <FlexBoxB>
        <Box>
        <AccessTimeIcon fontSize="medium"></AccessTimeIcon>
        </Box>
        <Box>
        {props.stageStartTime} ~ {props.stageEndTime}
        </Box>
        <Box>
        <MicExternalOnIcon fontSize="medium"></MicExternalOnIcon>
        </Box>
        <Box>
        {props.showCount} 회
        </Box>
        <Box sx={{width:'65px'}}/>
        </FlexBoxB>
    </CardContent>
    
    <CardContent sx={{fontSize:12}}>
        <FlexBoxB>
        <Box sx={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <Box sx={{width:'40px'}}>
        <LocalAtmIcon fontSize="medium"></LocalAtmIcon>
        </Box>
        <Box>
        &nbsp;{props.stageCost}만원 이상
        </Box>
        </Box>
        
        <Box sx={{display:'flex',alignItems:'center'}}>
        <Box sx={{width:'40px'}}>
        <LocationOnIcon fontSize="medium"></LocationOnIcon>
        </Box>
        <LeftBox sx={{display:'flex'}}>
        {props.stageTypes.map((genre,index,arr) => (
                        <Types genre={genre} key={genre.stageTypeId} index={index} arr={arr}/>
                    ))}
        </LeftBox>
        </Box>
        </FlexBoxB>
    </CardContent>
    
    <CardContent sx={{fontSize:12}}>
        <FlexBoxB>
        <Box>
        <HeadsetMicIcon fontSize="medium"></HeadsetMicIcon>
        </Box>
        <RightBox sx={{display:'flex'}}>
        {props.stageGenres.map((genre,index,arr) => (
                        <Types genre={genre} key={genre.stageGenreId} index={index} arr={arr}/>
                    ))}
        </RightBox>
        </FlexBoxB>
    </CardContent>
    </Card>
  </>
    )
}

export default StageCard;