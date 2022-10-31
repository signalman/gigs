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

function Types({genre,index,arr}) {
    return(
        <div>
            <b>{genre.genreName}</b>{arr.length-1 > index ? "/" : null}
        </div>
    );
}

function StarCard(props) {
    return (
        <>
        <Card sx={{ maxWidth: 300 ,maxHeight: 465, border:0.1}}>
        <Link className='star_card_link' to={'/stars/'+props.starId} style={{ color:"black",textDecoration: "none" }}>
      <CardHeader sx={{textAlign: 'center'}}
        title={props.starName}
      />
      <CardMedia
        component="img"
        height="160"
        image={props.starImgUrl}
        alt="stars"
      />

      <CardContent sx={{fontSize:13 ,textAlign:'center',fontWeight:'bold'}}>
      {props.starAddress}
      <div style={{paddingTop:10}}>
      <Rating name="half-rating-read" defaultValue={props.avgScore} precision={0.5} readOnly />
      </div>
      </CardContent>
      <Divider/>

        <CardContent sx={{display:"flex",fontSize:12,pl:8,pr:8}}>
        <PeopleIcon fontSize="small"></PeopleIcon>&nbsp;{props.memberNumber} 인 &nbsp;{props.gender}
       <div style={{marginLeft:'auto'}}>
       <MicExternalOnIcon fontSize="small"></MicExternalOnIcon>&nbsp;
       {props.showCount} 회
       </div>
        </CardContent>
        <Divider/>
        <CardContent sx={{display:"flex",fontSize:12,pl:13}}>
        
        <HeadsetMicIcon fontSize="small"></HeadsetMicIcon>&nbsp;&nbsp;
        {props.starGenres.map((genre,index,arr) => (
                        <Types genre={genre} key={genre.starGenreId} index={index} arr={arr}/>
                    ))}
        </CardContent>
        <Divider/>

        <CardContent sx={{display:"flex",fontSize:12,pl:13}}>
        <LocationOnIcon fontSize="small"></LocationOnIcon>&nbsp;
        {props.starStageTypes.map((genre,index,arr) => (
                        <Types genre={genre} key={genre.starStageTypeId} index={index} arr={arr}/>
                    ))}
        </CardContent>
        
      </Link>
    </Card>
        </>
    )
}

export default StarCard;