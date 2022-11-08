import { Box, TextField, styled } from '@mui/material';
import React, { useState } from 'react';
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

/**
 * gigs 접속 시 제일 처음 보여지는 페이지
 * gigs에 대한 안내 혹은 홍보, 이벤트 등이 보여짐
 */
const Main = ({
  children,
}) => {
  const [selectedDay, setSelectedDay] = useState(moment());

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
                  console.log(selectedDays[0].isSame(days));
                  console.log(selectedDays[0].month());

                  console.log(pickerDayProps);

                  // return (<PickersDay day={days} outsideCurrentMonth={days.month() !== selectedDays[0].month()} selected={selectedDays[0].isSame(days)} onDaySelect={() => {}} />)
                  return (
                    <Box sx={{ position: 'relative' }}>
                      <PickersDay {...pickerDayProps} />
                      {pickerDayProps.outsideCurrentMonth ? (<></>) : (<Box sx={{ position: 'absolute', top: 0, right: 0, color: 'red', fontSize: '9px' }}>
                        15
                      </Box>)}
                      
                    </Box>
                  )
                }}
              >

              </StaticDatePicker>
            </LocalizationProvider>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Main;