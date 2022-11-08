import { Box, Rating } from '@mui/material';
import React from 'react';
import StarDummyImg from '../../images/star_tmp.jpg';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const ReviewItem = () => {
  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
      <Box
        sx={{
          height: '30px',
          display: 'flex',
        }}
      >
        <Box
          sx={{
            width: '25px',
            height: '25px',
            py: '2.5px',
            px: '12.5px',
          }}
        >
          <img src={StarDummyImg} alt="profile_img" width="25px" height="25px" style={{borderRadius: "12.5px",}} />
        </Box>
        <Box
          sx={{
            width: '1000px',
            height: '30px',
            lineHeight: '30px',
            fontWeight: 'bold',
          }}
        >
          Imagin Dragons
        </Box>
        <Box
          sx={{
            height: '20px',
            py: '5px',
          }}
        >
          <Rating
            sx={{ width: `100px` }}
            emptyIcon={<StarBorderIcon sx={{ width: `20px`, height: `20px` }}></StarBorderIcon>}
            icon={<StarIcon sx={{ width: `20px`, height: `20px` }}></StarIcon>}
            value={4.9} precision={0.1} readOnly
          />
        </Box>
      </Box>
      {/* 리뷰 내용 */}
      <Box
        sx={{
          width: '100%',
          fontSize: '14px',
        }}
      >
        안녕하세요, 박상연입니다. 리뷰 테스트합니다. 안녕하세요, 박상연입니다. 리뷰 테스트합니다. 안녕하세요, 박상연입니다. 리뷰 테스트합니다. 안녕하세요, 박상연입니다. 리뷰 테스트합니다. 안녕하세요, 박상연입니다. 리뷰 테스트합니다. 안녕하세요, 박상연입니다. 리뷰 테스트합니다. 안녕하세요, 박상연입니다. 리뷰 테스트합니다. 안녕하세요, 박상연입니다. 리뷰 테스트합니다. 안녕하세요, 박상연입니다. 리뷰 테스트합니다. 안녕하세요, 박상연입니다. 리뷰 테스트합니다. 안녕하세요, 박상연입니다. 리뷰 테스트합니다. 안녕하세요, 박상연입니다. 리뷰 테스트합니다. 
      </Box>
    </Box>
  );
};

export default ReviewItem;