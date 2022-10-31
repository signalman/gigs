import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Card,CardMedia,styled,
    CardContent,Rating,Divider,Box
 } from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import PeopleIcon from '@mui/icons-material/People';
import MicExternalOnIcon from '@mui/icons-material/MicExternalOn';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const FlexBoxA = styled(Box)((p) => ({
    display:"flex",
    justifyContent: 'space-around',
    alignItems:'center'
  }));

  const FlexBoxB = styled(Box)((p) => ({
    display:"flex",
    justifyContent: 'space-evenly',
    alignItems:'center'
  }));

  const RightBox = styled(Box)((p) => ({
    width : '190px',
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }));

  const LeftBox = styled(Box)((p) => ({
    width : '100px',
    justifyContent: 'center',
  alignItems: 'center',
  }));

function Types({genre,index,arr}) {
    return(
        <div>
            <b>{genre.genreName}</b>{arr.length-1 > index ? "/" : null}
        </div>
    );
}

function StarCard(props) {
  const navigate = useNavigate();

    return (
        <>
    <Card sx={{ width: 300 ,height: 450, border:0.1}} onClick={() => navigate('/stars/'+props.starId)}>
    <CardMedia
    component="img"
    height="160"
    image={props.starImgUrl}
    alt="stars"
    />
      
    <CardContent>
        <FlexBoxA>
        <Box sx={{fontSize:20,fontWeight:'bold'}}>
        {props.starName}
        </Box>
        <RightBox>
        <Rating name="half-rating-read" defaultValue={props.avgScore} precision={0.5} readOnly />
        </RightBox>
        </FlexBoxA>
    </CardContent>
    
    <CardContent sx={{fontSize:13 ,textAlign:'center'}}>
        <FlexBoxB>
        <Box>
        <MapIcon></MapIcon>
        </Box>
        <RightBox>
        {props.starAddress}
        </RightBox>
        </FlexBoxB>
    </CardContent>
      
    <CardContent sx={{fontSize:13}}>
        <FlexBoxB>
        <Box>
        <PeopleIcon fontSize="medium"></PeopleIcon>
        </Box>
        <LeftBox>
        {props.memberNumber} 인 &nbsp; {props.gender}
        </LeftBox>
        <Box>
        <MicExternalOnIcon fontSize="medium"></MicExternalOnIcon>
        </Box>
        <Box>
        {props.showCount} 회
        </Box>
        </FlexBoxB>
    </CardContent>
    
    <CardContent sx={{fontSize:12}}>
        <FlexBoxB>
        <Box>
        <HeadsetMicIcon fontSize="medium"></HeadsetMicIcon>
        </Box>
        <RightBox>
        {props.starGenres.map((genre,index,arr) => (
                        <Types genre={genre} key={genre.starGenreId} index={index} arr={arr}/>
                    ))}
        </RightBox>
        </FlexBoxB>
    </CardContent>

    <CardContent sx={{fontSize:12}}>
        <FlexBoxB>
        <Box>
        <LocationOnIcon fontSize="medium"></LocationOnIcon>
        </Box>
        <RightBox>
        {props.starStageTypes.map((genre,index,arr) => (
                        <Types genre={genre} key={genre.starStageTypeId} index={index} arr={arr}/>
                    ))}
        </RightBox>
        </FlexBoxB>
    </CardContent>
    </Card>
        </>
    )
}

export default StarCard;