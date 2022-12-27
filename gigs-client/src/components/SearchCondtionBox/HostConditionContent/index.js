import styled from '@emotion/styled';
import React, { useState } from 'react';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Box, MenuItem, Select, TextField, Typography } from '@mui/material';
import moment from 'moment';
import counties from '../../../utils/Address.json';

const Container = styled(Box)((props) => ({
  width: '100%',
  display: 'flex',
}));

const DateBox = styled(Box)((props) => ({
  width: '200px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRight: '.5px solid black'
}));

const DatePickerTextField = styled(TextField)((props) => ({
  width: '150px',
}));

const DatePickerTextFieldProps = {
  size: 'small',
  variant: 'standard',
}

const HostConditionContent = () => {
  const [siDo, setSiDo] = useState('전체 지역');
  const [siGunGu, setSiGunGu] = useState('-');

  // 주소 변경 시
  const handleChangeSiDo = (e) => {
    setSiGunGu('-');
    setSiDo(e.target.value);
  };

  const handleChangeSiGunGu = (e) => {
    setSiGunGu(e.target.value);
  }

  return (
    <Container>
      <DateBox>
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
      </DateBox>
      <DateBox>
        <Select
          sx={{
            width: '150px',
            height: '30px',
            textIndent: '10px',
            mt: '10px',
            mb: '20px',
          }}
          variant='standard'
          value={siDo}
          onChange={handleChangeSiDo}
        >
          <MenuItem value='전체 지역'>전체 지역</MenuItem>
          {Object.keys(counties).map(siDoItem => (
            <MenuItem key={siDoItem} value={siDoItem}>{siDoItem}</MenuItem>
          ))}
        </Select>
        <Select
          sx={{
            width: '150px',
            height: '50px',
            textIndent: '10px',
          }}
          disabled={siDo === '전체 지역'}
          variant='standard'
          value={siGunGu}
          onChange={handleChangeSiGunGu}
        >
          <MenuItem value='-'>시/군/구</MenuItem>  
          {siDo !== '전체 지역' && Object.keys(counties[siDo]).map(siGunGuItem => (
            <MenuItem key={siGunGuItem} value={siGunGuItem}>{siGunGuItem}</MenuItem>  
          ))}
        </Select>
      </DateBox>
    </Container>
  );
};

export default HostConditionContent;