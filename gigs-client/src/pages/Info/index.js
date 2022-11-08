import { Box, Button, Typography, Rating, styled } from '@mui/material';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import StageDummyImg from '../../images/stage_tmp.jpg';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { COLOR } from '../../utils/Constants';
import StageDetailInfoBox from '../../components/StageDetailInfoBox';
import ReviewBox from '../../components/ReviewBox';

const PostItemWrapper = styled(Box)((p) => ({
  width: '200px',
  height: '200px',
  padding: '20px',
}));

const PostItem = styled(Box)((p) => ({
  width: '200px',
  height: '200px',
  border: '1px solid black',
}));

const Info = ({
  target,
}) => {
  const location = useLocation();

  useEffect(() => {

  }, []);

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
            height: "150px",
          }}
        >
          <Typography
            sx={{
              height: "150px",
              lineHeight: "150px",
              fontSize: "60px",
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
              fontSize: '25px',
              color: COLOR.grey,
            }}
          >
            경기도 수원시 영통구
          </Typography>
          <Box
            sx={{
              position: 'absolute',
              right: 0,
              top: 40,
              width: '155px',
              height: '100px',
            }}
          >
            <Button
              sx={{
                width: '100%',
                height: '60px',
                fontSize: '25px',
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
                sx={{ width: `100px` }}
                emptyIcon={<StarBorderIcon sx={{ width: `20px`, height: `20px` }}></StarBorderIcon>}
                icon={<StarIcon sx={{ width: `20px`, height: `20px` }}></StarIcon>}
                value={3.6} precision={0.1} readOnly
              />
              <Typography sx={{ height: '20px', lineHeight: '20px', }} fontSize="15px">{`(17)`}</Typography>
              <ArrowForwardIosIcon sx={{ height: '15px' }} />
            </Box>
          </Box>
        </Box>
      </Box>
      <StageDetailInfoBox />
      <Box
        sx={{
          m: '0 auto',
          mt: '50px',
          width: '1200px',
          display: 'flex',
          flexWrap: 'wrap',
          boxShadow: `0 4px 4px ${COLOR.blacky}`,
        }}
      >
        <PostItemWrapper>
          <PostItem>

          </PostItem>
        </PostItemWrapper>
        <PostItemWrapper>
          <PostItem />
        </PostItemWrapper>
        <PostItemWrapper>
          <PostItem />
        </PostItemWrapper>
        <PostItemWrapper>
          <PostItem />
        </PostItemWrapper>
        <PostItemWrapper>
          <PostItem />
        </PostItemWrapper>
        <PostItemWrapper>
          <PostItem />
        </PostItemWrapper>
        <PostItemWrapper>
          <PostItem />
        </PostItemWrapper>
        <PostItemWrapper>
          <PostItem />
        </PostItemWrapper>
        <PostItemWrapper>
          <PostItem />
        </PostItemWrapper>
      </Box>
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