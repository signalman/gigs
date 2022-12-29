import styled from '@emotion/styled';
import { Box, Switch, TextField } from '@mui/material';
import React, { useState } from 'react';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import moment, { isDate } from 'moment';

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

const SwitchBox = styled(Box)((props) => ({
  width: '150px',
  display: 'flex',
  justifyContent: 'flex-end',
  fontSize: '12px',
  alignItems: 'center',
  marginTop: '20px',
}));

const DateCondition = ({
  onChangeStartDate,
  onChangeEndDate,
}) => {
  const [isDateSearch, setDateSearch] = useState(true);
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());

  // 날짜/시간 조건 선택 여부
  const handleChangeDateSearch = (e) => {
    const checked = e.target.checked;
    setDateSearch(checked);
    onChangeStartDate(checked ? startDate.format('YYYY-MM-DD') : '');
    onChangeEndDate(checked ? endDate.format('YYYY-MM-DD') : '');
  }

  // 시작 날짜 변경 시
  const handleChangeStartDate = (e) => {
    setStartDate(e);
    onChangeStartDate(e.format('YYYY-MM-DD'));
  }

  // 종료 날짜 변경 시
  const handleChangeEndDate = (e) => {
    setEndDate(e);
    onChangeEndDate(e.format('YYYY-MM-DD'));
  }

  return (
    <Container>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePicker
          renderInput={(props) => <DatePickerTextField {...DatePickerTextFieldProps} {...props} />}
          label="From"
          value={startDate}
          onChange={handleChangeStartDate}
          disabled={!isDateSearch}
        />
        <Box sx={{ height: '20px' }} />
        <DatePicker
          renderInput={(props) => <DatePickerTextField {...DatePickerTextFieldProps} {...props} />}
          label="To"
          value={endDate}
          onChange={handleChangeEndDate}
          disabled={!isDateSearch}
        />
        <Box sx={{ width: '30px' }} />
      </LocalizationProvider>
      <SwitchBox>
        주소 검색 하기
        <Switch checked={isDateSearch} onChange={handleChangeDateSearch} />
      </SwitchBox>
    </Container>
  );
};

export default DateCondition;