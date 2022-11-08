import { Box, TextField, styled, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import {StaticDatePicker} from '@mui/x-date-pickers/StaticDatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers';
import moment from 'moment';


const Container = styled(Box)((p) => ({
  width: '1200px',
  margin: '0 auto',
  height: '1500px', // 임시
  backgroundColor: 'pink',
}));

const PostItem = styled(Box)((p) => ({
  width: '145px',
  height: '50px',
  border: '1px solid black',
}));

/**
 * gigs 접속 시 제일 처음 보여지는 페이지
 * gigs에 대한 안내 혹은 홍보, 이벤트 등이 보여짐
 */
const Main = ({
  children,
}) => {
  const [data, setData] = useState({
    posts: [
      {
        startDate: "2022-11-03",
        //endDate
        startTime: "02:00",
        endTime: "04:00",
      },
      {
        startDate: "2022-11-03",
        //endDate
        startTime: "06:00",
        endTime: "08:00",
      },
      {
        startDate: "2022-11-04",
        //endDate
        startTime: "02:00",
        endTime: "04:00",
      },
    ],
  });
  const [dataForCalendar, setDataForCalendar] = useState({});
  const [timeTable, setTimeTable] = useState([]);
  const [selectedDay, setSelectedDay] = useState(moment());

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
      let newTimeTable = [];
      for(let i=0; i+unit<=24; i++) {
        newTimeTable.push(i);
      }
      setTimeTable(newTimeTable);
    } else {
      setTimeTable([]);
    }
  }, [data, selectedDay]);

  return (
    <>
      <Container>
        {children}
        <Box
          sx={{
            width: '1200px',
            display: 'flex',
          }}
        >
          <Box
            sx={{
              width: '600px',
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
                  // console.log(days);

                  console.log(`${days.format("YYYY-MM-DD")}: ${!dataForCalendar[days.format("YYYY-MM-DD")]}`);

                  // return (<PickersDay day={days} outsideCurrentMonth={days.month() !== selectedDays[0].month()} selected={selectedDays[0].isSame(days)} onDaySelect={() => {}} />)
                  return (
                    <Box sx={{ position: 'relative' }}>
                      <PickersDay {...pickerDayProps} />
                      {pickerDayProps.outsideCurrentMonth || !dataForCalendar[days.format("YYYY-MM-DD")] ? (<></>) : (
                        <Box sx={{ position: 'absolute', top: '8px', right: '8px', backgroundColor: 'red', width: '5px', height: '5px', borderRadius: '5px' }}>
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
              width: '600px',
            }}
          >
            <Grid container spacing={'0px'} rowSpacing={'0px'}>
              {timeTable?.map(item => (
                <Grid key={item}><PostItem>{item}</PostItem></Grid>              
              ))}
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Main;