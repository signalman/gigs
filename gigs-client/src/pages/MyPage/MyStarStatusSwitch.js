import styled from '@emotion/styled';
import { Box, Switch } from '@mui/material';
import React, { useState } from 'react';
import { COLOR } from '../../utils/Constants';

const Container = styled(Box)((props) => ({
  width: '300px',
  height: '50px',
  position: 'absolute',
  top: 0, right: 0,
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
}));

const MyStarStatusSwitch = () => {
  const [isActive, setActive] = useState(false);

  const handleActiveChange = (e) => {
    setActive(e.target.checked);
  }

  return (
    <Container>
      <Switch value={isActive} onChange={handleActiveChange} />
      <Box sx={{ height: '50px', lineHeight: '50px', fontWeight: 'bold', color: isActive ? COLOR.blacky : COLOR.grey, }}>
        {isActive ? '공연 찾는 중...' : '공연을 찾고 있지 않습니다'}
      </Box>      
    </Container>
  );
};

export default MyStarStatusSwitch;