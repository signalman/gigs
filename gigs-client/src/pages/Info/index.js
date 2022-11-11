import { Box, Button, Typography, Rating, styled, TextField, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import StageDummyImg from '../../images/stage_tmp.jpg';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { COLOR, DUMMY } from '../../utils/Constants';
import StageDetailInfoBox from '../../components/StageDetailInfoBox';
import ReviewBox from '../../components/ReviewBox';
import {StaticDatePicker} from '@mui/x-date-pickers/StaticDatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers';
import moment from 'moment';
import './style.css';
import ReservationTable from './ReservationTable';

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

  const [data, setDate] = useState(DUMMY.host);
  const [selectedDay, setSelectedDay] = useState(moment());
  const [dataForCalendar, setDataForCalendar] = useState({});
  const [timeTable, setTimeTable] = useState([]);

  useEffect(() => {
    const newDataForCalendar = {};

    data?.posts.forEach(post => {
      if(!newDataForCalendar[post.startDate]) newDataForCalendar[post.startDate] = 1;
      else newDataForCalendar[post.startDate]++;
    })

    console.log(newDataForCalendar);
    setDataForCalendar(newDataForCalendar);
  }, [data]);

  useEffect(() => {
    const postsByDate = data.posts.filter(post => post.startDate === selectedDay.format("YYYY-MM-DD"));
    if(postsByDate.length > 0) {
      const unit = Number(postsByDate[0].endTime.substring(0, 2)) - Number(postsByDate[0].startTime.substring(0, 2));
      let dataIdx = 0;
      let newTimeTable = [];
      for(let i=0; i+unit<=24; i+=unit) {
        const newTime = [];
        newTime.push(i);
        if(dataIdx < postsByDate.length && Number(postsByDate[dataIdx].startTime.substring(0, 2)) === i) {
          newTime.push(true);
          dataIdx++;
        } 
        else newTime.push(false);
        newTimeTable.push(newTime);
      }
      setTimeTable(newTimeTable);
    } else {
      setTimeTable([]);
    }
  }, [data, selectedDay]);

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
      <Box
        sx={{
          display: 'flex',
          width: '1200px',
          m: '0 auto',
          mt: '25px',
        }}
      >
        <Box
          sx={{
            width: 'calc(600px - 100px)',
            margin: '50px',
            border: '1px solid gray',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <StaticDatePicker
              displayStaticWrapperAs="desktop"
              value={selectedDay}
              onChange={(e) => {
                setSelectedDay(e);
              }}
              renderInput={(params) => <TextField {...params} />}
              renderDay={(days, selectedDays, pickerDayProps) => {
                return (
                  <Box sx={{ position: 'relative' }}>
                    <PickersDay {...pickerDayProps} />
                    {pickerDayProps.outsideCurrentMonth || !dataForCalendar[days.format("YYYY-MM-DD")] ? (<></>) : (
                      <Box key={days._d} sx={{ position: 'absolute', top: '8px', right: '8px', backgroundColor: 'red', width: '5px', height: '5px', borderRadius: '5px' }}>
                      </Box>
                    )}
                    
                  </Box>
                )
              }}
            >

            </StaticDatePicker>
          </LocalizationProvider>
        </Box>
        <Box
          sx={{
            width: 'calc(600px - 100px)',
            margin: '50px',
            border: '1px solid gray',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Box sx={{ width: '480px', }}>
            <ReservationTable timeTable={data?.posts.filter(post => post.startDate === selectedDay.format("YYYY-MM-DD"))} />
          </Box>
        </Box>
      </Box>

      {/* <Box
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
      </Box> */}
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