import { Box, Button, styled } from '@mui/material';
import React, { useEffect } from 'react';
// import KakaoBtn from '../../../public/img/kakao_login_button.png';
import axios from 'axios';
import { API } from '../../utils/Constants';

const Container = styled(Box)((p) => ({
  width: '1200px',
  margin: '0 auto',
  height: '1500px', // 임시
  backgroundColor: 'pink',
}));

const TmpPage = ({
  
  
}) => {

  useEffect(async () => {
    await axios.get('http://localhost:8080/wait').then(function (response) {
      console.log(response)
    }).catch(function (err) {
      console.log(err);
    })

      }, []);

  return (
    <>
      <Container>

      </Container>
    </>
  );
};

export default TmpPage;