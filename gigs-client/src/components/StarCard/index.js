import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Card, CardMedia, styled,
    CardContent, Rating ,Box, Typography
 } from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import PeopleIcon from '@mui/icons-material/People';
import MicExternalOnIcon from '@mui/icons-material/MicExternalOn';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

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

function StarCard(props) {
  const navigate = useNavigate();

    return (
        <>
            <Card
                sx={{
                    width: "300px",
                    height: "450px",
                    border: "1.5px solid #808080",
                    borderRadius: "50px",
                    boxShadow: "0 4px 4px #808080",
                    cursor: "pointer",
                }}
                onClick={() => navigate('/stars/'+props.starId)}
            >
                <CardMedia
                    component="img"
                    height="225"
                    image={props.starImgUrl}
                    alt="stars"
                />
      
                <Line>
                    <Item type="half" sx={{ pl: "20px", }} >
                        <Typography>{props.starName}</Typography>
                    </Item>
                    <Item type="half" sx={{ justifyContent: 'end', pr: "20px" }}>
                        <Rating
                            sx={{ width: `75px` }}
                            emptyIcon={<StarBorderIcon sx={{ width: `15px`, height: `15px` }}></StarBorderIcon>}
                            icon={<StarIcon sx={{ width: `15px`, height: `15px` }}></StarIcon>}
                            defaultValue={props.avgScore} precision={0.1} readOnly
                        />
                        <Typography fontSize=".7rem">({props.reviewCount})</Typography>
                    </Item>
                </Line>
                
                <Line>
                    <Item sx={{ px: '15px' }}>
                        <IconBox>
                            <MapIcon sx={{ width: "20px", height: "20px", }} />
                        </IconBox>
                        <Typography fontSize=".9rem">{props.starAddress}</Typography>
                    </Item>
                </Line>
                
                <Line>
                    <Item type="half" sx={{ px: '15px' }}>
                        <IconBox>
                            <PeopleIcon sx={{ width: '20px', height: '20px', }} />
                        </IconBox>
                        <Typography fontSize=".9rem">{props.memberNumber}인 {props.gender}</Typography>
                    </Item>
                    <Item type="half" sx={{ px: '15px' }}>
                        <IconBox>
                            <MicExternalOnIcon sx={{ width: '20px', height: '20px', }} />
                        </IconBox>
                        <Typography fontSize=".9rem">{props.showCount}회</Typography>
                    </Item>
                </Line>

                <Line>
                    <Item sx={{ px: '15px' }}>
                        <IconBox>
                            <HeadsetMicIcon sx={{ width: "20px", height: "20px", }} />
                        </IconBox>
                        <Typography fontSize=".9rem">{props.starGenres?.reduce((prev, cur) => (prev + ` / ${cur.genreName}`), "").substring(3)}</Typography>
                    </Item>
                </Line>

                <Line>
                    <Item sx={{ px: '15px' }}>
                        <IconBox>
                            <LocationOnIcon sx={{ width: "20px", height: "20px", }} />
                        </IconBox>
                        <Typography fontSize=".9rem">{props.starStageTypes?.reduce((prev, cur) => (prev + ` / ${cur.stageTypeName}`), "").substring(3)}</Typography>
                    </Item>
                </Line>
            </Card>
        </>
    )
}

export default StarCard;