import { Box, Button, Typography, Rating, } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import StageDummyImg from '../../images/stage_tmp.jpg';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { API, COLOR, DUMMY, SYMBOL } from '../../utils/Constants';
import StageDetailInfoBox from '../../components/StageDetailInfoBox';
import ReviewBox from '../../components/ReviewBox';
import './style.css';
import axios from 'axios';
import ReservationBox from './ReservationBox';

const Info = ({
  target,
}) => {
  const params = useParams();

  const [data, setData] = useState(DUMMY.host);

  const fetchHostInfo = useCallback(async () => {
    const result = await axios.get(API.getHostInfo(params.id));
    console.log(result.data);
    setData(result.data);
  })

  useEffect(() => {
    switch(target) {
      case SYMBOL.star:
        break;
      case SYMBOL.stage:
        // fetchHostInfo();
        break;
    }
  }, [target]);

  return (
    <>
      <Box sx={{ width: '100%', height: '300px' }}>
        <img src={StageDummyImg} alt="image" width="100%" height="300px" />
      </Box>
      <Box
        sx={{
          width: "1200px",
          m: "0 auto",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "100px",
          }}
        >
          <Typography
            sx={{
              height: "100px",
              lineHeight: "100px",
              fontSize: "40px",
              fontWeight: "bold",
              color: COLOR.blacky,
            }}
          >
            카페 안녕
          </Typography>
          <Typography
            sx={{
              position: 'absolute',
              left: 0,
              bottom: 0,
              fontSize: '15px',
              color: COLOR.grey,
            }}
          >
            경기도 수원시 영통구
          </Typography>
          <Box
            sx={{
              position: 'absolute',
              right: 0,
              top: 30,
              width: '120px',
              height: '80px',
            }}
          >
            <Button
              sx={{
                width: '100%',
                height: '40px',
                fontSize: '18px',
                fontWeight: 'bold',
                borderRadius: 3,
              }}
              variant='contained'
            >
              연결
            </Button>
            <Box
              sx={{
                display: "flex",
                alignItems: 'center',
                height: '40px',
              }}
            >
              <Rating
                sx={{ width: `75px` }}
                emptyIcon={<StarBorderIcon sx={{ width: `15px`, height: `15px` }}></StarBorderIcon>}
                icon={<StarIcon sx={{ width: `15px`, height: `15px` }}></StarIcon>}
                value={3.6} precision={0.1} readOnly
              />
              <Typography sx={{ height: '30px', lineHeight: '30px', }} fontSize="10px">{`(17)`}</Typography>
              <ArrowForwardIosIcon sx={{ height: '10px' }} />
            </Box>
          </Box>
        </Box>
      </Box>
      <StageDetailInfoBox />
      {target === SYMBOL.stage ? (
        <ReservationBox
          data={data}
        />
      ) : (<></>)}
      {/* 소개글 */}
      <Box
        sx={{
          width: '1100px',
          height: '500px',
          m: '0 auto',
          mt: '50px',
          px: '50px',
          boxShadow: `0 4px 4px ${COLOR.blacky}`,
        }}
      >
        <Typography
          sx={{
            height: '50px',
            lineHeight: '50px',
            fontSize: '25px',
            fontWeight: 'bold',
          }}
        >
          소개글
        </Typography>
      </Box>
      {/* 리뷰 */}
      <ReviewBox />
    </>
    
  );
};

export default Info;