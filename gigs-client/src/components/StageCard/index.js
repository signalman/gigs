import React from 'react';
import {Link} from 'react-router-dom';
import {Card,CardHeader,CardMedia,
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
function Types({genre,index,arr}) {
    return(
        <div>
            <b>{genre.genreName}</b>{arr.length-1 > index ? "/" : null}
        </div>
    );
}

function StageCard(props) {
    return (
        <>
        <Card sx={{ maxWidth: 300 ,maxHeight: 550,border:0.1}}>
        <Link className='stage_card_link' to={'/stages/'+props.hostId} style={{ color:"black",textDecoration: "none" }}>
      <CardHeader sx={{textAlign: 'center'}}
        title={props.stageName}
      />
      <CardMedia
        component="img"
        height="160"
        image={props.stageImgUrl}
        alt="stages"
      />
      <CardContent sx={{fontSize:13,textAlign:'center',fontWeight:'bold'}}>
      {props.stageAddress}
      <div style={{paddingTop:10}}>
      <Rating name="half-rating-read" defaultValue={props.avgScore} precision={0.5} readOnly />
      </div>
      </CardContent>
        <Divider/>

        <CardContent sx={{display:"flex",fontSize:12,pl:7,pr:6}}>
         <PhotoSizeSelectSmallIcon fontSize="small"></PhotoSizeSelectSmallIcon>
         &nbsp;&nbsp;{props.stageSize} m^2
         <div style={{marginLeft:'auto'}}>
         <PeopleIcon fontSize="small"></PeopleIcon>&nbsp;{props.age} 살 이상
         </div>
        </CardContent>
        <Divider/>

        <CardContent sx={{display:"flex",fontSize:12,pl:6,pr:8}}>
        <AccessTimeIcon fontSize="small"></AccessTimeIcon>&nbsp;{props.stageStartTime} ~ {props.stageEndTime}
        <div style={{marginLeft:'auto'}}>
        <MicExternalOnIcon fontSize="small"></MicExternalOnIcon>&nbsp;{props.showCount} 회
        </div>
        </CardContent>
        <Divider/>

        <CardContent sx={{display:"flex",fontSize:12,pl:6,pr:9}}>
        <LocalAtmIcon fontSize="small"></LocalAtmIcon>&nbsp;{props.stageCost} 만원 이상
        <div style={{display:'flex',marginLeft:'auto'}}>
        <LocationOnIcon fontSize="small"></LocationOnIcon>
        {props.stageTypes.map((genre,index,arr) => (
                        <Types genre={genre} key={genre.stageTypeId} index={index} arr={arr}/>
                    ))}
        </div>
        </CardContent>
        <Divider/>

        <CardContent sx={{display:"flex",fontSize:12,pl:13}}>
        <HeadsetMicIcon fontSize="small"></HeadsetMicIcon>&nbsp;
        {props.stageGenres.map((genre,index,arr) => (
                        <Types genre={genre} key={genre.stageGenreId} index={index} arr={arr}/>
                    ))}
        </CardContent>
      </Link>
    </Card>
        </>
    )
}

export default StageCard;