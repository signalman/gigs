import {StaticDatePicker} from '@mui/x-date-pickers/StaticDatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers';
import styled from '@emotion/styled';
import { Box, TextField } from '@mui/material';
import React, { useState, useEffect, useCallback } from 'react';
import { COLOR } from '../../utils/Constants';
import ReservationTable from './ReservationTable';
import moment from 'moment';
import { deletePost } from '../../utils/Api';

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
  host,
  posts,
  setPosts,
  editable,
  reservationBoxRef,
}) => {
  const [selectedDay, setSelectedDay] = useState(moment());
  const [dataForCalendar, setDataForCalendar] = useState({});

  const handleDeletePostClick = useCallback(async (postId) => {
    const response = await deletePost(postId);

    console.log('포스트 삭제 결과:')
    console.log(response);

    setPosts(posts?.filter(post => post.postId !== postId));
  }, [posts, setPosts]);

  useEffect(() => {
    const newDataForCalendar = {};

    posts?.forEach(post => {
      if(!newDataForCalendar[post.date]) newDataForCalendar[post.date] = 1;
      else newDataForCalendar[post.date]++;
    })

    setDataForCalendar(newDataForCalendar);
  }, [posts]);

  return (
    <Container ref={reservationBoxRef}>
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
          {selectedDay.isBefore(moment().add('-1', 'd')) ? (
            <Box sx={{ width: '480px', height: '380px', lineHeight: '380px', color: COLOR.grey, textAlign: 'center', fontSize: '20px' }}>
              지난 예약은 확인할 수 없습니다.
            </Box>
          ) : (
            editable ? (
              <Box sx={{ width: '480px', }}>
                <ReservationTable host={host} selectedDay={selectedDay} timeTable={posts?.filter(post => post.date === selectedDay.format("YYYY-MM-DD"))} onDeletePost={handleDeletePostClick} editable={editable} />
              </Box>
            ) : (
              dataForCalendar[selectedDay.format("YYYY-MM-DD")] > 0 ? (
                <Box sx={{ width: '480px', }}>
                  <ReservationTable timeTable={posts?.filter(post => post.date === selectedDay.format("YYYY-MM-DD"))} onDeletePost={handleDeletePostClick} editable={editable} />
                </Box>
              ) : (
                <Box sx={{ width: '480px', height: '380px', lineHeight: '380px', color: COLOR.grey, textAlign: 'center', fontSize: '20px' }}>
                  등록된 무대가 없습니다.
                </Box>
              )
            )
          )}
        </Content>
      </Body>
    </Container>
  );
};

export default ReservationBox;