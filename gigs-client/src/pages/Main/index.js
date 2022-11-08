import { Box, styled } from '@mui/material';
import React from 'react';
import StaticDatePicker from '@mui/x-date-pickers/StaticDatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';

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
            
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Main;