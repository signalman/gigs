import { Box, Typography, } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import StageDummyImg from '../../images/stage_tmp.jpg';
import { API, COLOR, DUMMY, SYMBOL } from '../../utils/Constants';
import StageDetailInfoBox from './StageDetailInfoBox';
import ReviewBox from '../../components/ReviewBox';
import './style.css';
import axios from 'axios';
import ReservationBox from './ReservationBox';
import InfoTitle from './InfoTitle';

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
      <InfoTitle titleInfo={{
        name: data.stageName,
        address: data.address,
        avgScore: data.avgScore,
        reviewCount: data.reviewCount,
      }} />
      <StageDetailInfoBox detailInfo={{
        stageSize: data?.stageSize,
        targetAge: data?.targetAge,
        targetGender: data?.targetGender,
        targetMinCount: data?.targetMinCount,
        pay: data?.pay,
        showCount: data?.showCount,
        stageType: data?.stageType,
      }} />
      {target === SYMBOL.stage ? (
        <ReservationBox data={data} />
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