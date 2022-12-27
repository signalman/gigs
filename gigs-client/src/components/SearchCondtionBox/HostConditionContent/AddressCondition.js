import styled from '@emotion/styled';
import { Box, MenuItem, Select } from '@mui/material';
import React, { useState } from 'react';
import counties from '../../../utils/Address.json';

const Container = styled(Box)((props) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const AddressCondition = () => {
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
      <Select
        sx={{
          width: '150px',
          height: '30px',
          textIndent: '10px',
          mt: '10px',
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
          height: '30px',
          textIndent: '10px',
          mt: '30px',
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
    </Container>
  );
};

export default AddressCondition;