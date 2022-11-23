import styled from '@emotion/styled';
import { Box, Switch } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { toggleStarStatus } from '../../utils/Api';
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

const MyStarStatusSwitch = ({
  status,
}) => {
  const [isActive, setActive] = useState(status);

  const handleActiveChange = useCallback(async (e) => {
    try {
      const response = await toggleStarStatus();
      console.log('토글 API 결과:')
      console.log(response);

      setActive(!e.target.checked);
    } catch(err) {
      console.log(err);
    }
  }, []);

  return (
    <Container>
      <Switch checked={isActive} onChange={handleActiveChange} />
      <Box sx={{ height: '50px', lineHeight: '50px', fontWeight: 'bold', color: isActive ? COLOR.blacky : COLOR.grey, }}>
        {isActive ? '공연 찾는 중...' : '공연을 찾고 있지 않습니다'}
      </Box>      
    </Container>
  );
};

export default MyStarStatusSwitch;