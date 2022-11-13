import {StaticDatePicker} from '@mui/x-date-pickers/StaticDatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers';
import styled from '@emotion/styled';
import { Box, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { COLOR } from '../../utils/Constants';
import ReservationTable from './ReservationTable';
import moment from 'moment';

const Container = styled(Box)(() => ({
  width: '1200px',
  margin: '0 auto',
  marginTop: '25px',
}));

const Header = styled(Box)((props) => ({
  width: '1200px',
  display: 'flex',
  height: '50px',
  borderBottom: '2px solid black',
}));

const Title = styled(Box)((props) => ({
  width: '50%',
  height: '50px',
  lineHeight: '50px',
  textIndent: '50px',
  fontSize: '20px',
  fontWeight: 'bold',
  color: COLOR.blacky,
}));

const Body = styled(Box)((props) => ({
  width: '1200px',
  display: 'flex',
  backgroundColor: COLOR.whity,
}));

const Content = styled(Box)((props) => ({
  width: 'calc(600px - 100px)',
  margin: '25px 50px',
  display: 'flex',
  justifyContent: 'center',
}));

const ReservationBox = ({
  data,
}) => {
  const [selectedDay, setSelectedDay] = useState(moment());
  const [dataForCalendar, setDataForCalendar] = useState({});


  useEffect(() => {
    const newDataForCalendar = {};

    data.posts?.forEach(post => {
      if(!newDataForCalendar[post.startDate]) newDataForCalendar[post.startDate] = 1;
      else newDataForCalendar[post.startDate]++;
    })

    setDataForCalendar(newDataForCalendar);
  }, [data]);

  return (
    <Container>
      <Header>
        <Title>
          날짜
        </Title>
        <Title>
          예약 가능 시간
        </Title>
      </Header>
      <Body>
        <Content>
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
                  <Box key={days._d} sx={{ position: 'relative' }}>
                    <PickersDay {...pickerDayProps} />
                    {pickerDayProps.outsideCurrentMonth || !dataForCalendar[days.format("YYYY-MM-DD")] ? (<></>) : (
                      <Box sx={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'red', width: '7.5px', height: '7.5px', borderRadius: '5px' }}>
                      </Box>
                    )}
                  </Box>
                )
              }}
            >

            </StaticDatePicker>
          </LocalizationProvider>
        </Content>
        <Content>
          <Box sx={{ width: '480px', }}>
            <ReservationTable timeTable={data?.posts?.filter(post => post.startDate === selectedDay.format("YYYY-MM-DD"))} />
          </Box>
        </Content>
      </Body>
    </Container>
  );
};

export default ReservationBox;