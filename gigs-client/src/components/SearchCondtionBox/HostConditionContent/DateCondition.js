import styled from '@emotion/styled';
import { Box, TextField } from '@mui/material';
import React from 'react';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import moment from 'moment';

const Container = styled(Box)((props) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const DatePickerTextField = styled(TextField)((props) => ({
  width: '150px',
}));

const DatePickerTextFieldProps = {
  size: 'small',
  variant: 'standard',
}

const DateCondition = () => {
  return (
    <Container>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePicker
          renderInput={(props) => <DatePickerTextField {...DatePickerTextFieldProps} {...props} />}
          label="From"
          value={moment()}
          onChange={() => {}}
          // disabled={!isTimeSearch}
        />
        <Box sx={{ height: '20px' }} />
        <DatePicker
          renderInput={(props) => <DatePickerTextField {...DatePickerTextFieldProps} {...props} />}
          label="To"
          value={moment()}
          onChange={() => {}}
          // disabled={!isTimeSearch}
        />
        <Box sx={{ width: '30px' }} />
      </LocalizationProvider>
    </Container>
  );
};

export default DateCondition;