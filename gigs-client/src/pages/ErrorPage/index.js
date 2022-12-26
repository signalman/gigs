import styled from '@emotion/styled';
import { Box } from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router-dom';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { COLOR } from '../../utils/Constants';

const Container = styled(Box)((props) => ({
  width: '100%',
  height: '500px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: COLOR.grey,
}));

const ErrorBox = styled(Box)((props) => ({
  width: '300px',
  height: '300px',
}));

const iconStyle = {
  width: '250px',
  height: '250px',
  marginLeft: '25px',
}

const MessageBox = styled(Box)((props) => ({
  width: '300px',
  height: '50px',
  textAlign: 'center',
  fontSize: '22px',
  fontWeight: 'bold',
}));

const ErrorPage = () => {
  const location = useLocation();
  console.log(location);

  return (
    <Container>
      <ErrorBox>
        <WarningAmberIcon sx={iconStyle} />
        <MessageBox>비정상적인 접근입니다.</MessageBox>
      </ErrorBox>
    </Container>
  );
};

export default ErrorPage;