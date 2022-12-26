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
  height: '350px',
}));

const iconStyle = {
  width: '250px',
  height: '250px',
  marginLeft: '25px',
}

const MessageBox = styled(Box)((props) => ({
  width: '300px',
  height: '50px',
  lineHeight: '50px',
  textAlign: 'center',
  fontSize: '22px',
  fontWeight: 'bold',
}));

const ErrorPage = () => {
  const location = useLocation();
  const urlState = location.state;

  return (
    <Container>
      <ErrorBox>
        <WarningAmberIcon sx={iconStyle} />
        <MessageBox>{urlState ? urlState.msg : '비정상적인 접근입니다.'}</MessageBox>
        {urlState && <MessageBox>이용에 불편을 드려 죄송합니다.</MessageBox>}
      </ErrorBox>
    </Container>
  );
};

export default ErrorPage;