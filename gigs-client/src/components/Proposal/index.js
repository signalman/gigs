import styled from '@emotion/styled';
import { autocompleteClasses, Box, Button, OutlinedInput, TextField } from '@mui/material';
import React from 'react';
import MiniProfile from '../../pages/MyPage/MiniProfile';
import { COLOR } from '../../utils/Constants';
import ProposalContent from './ProposalContent';


const Container = styled(Box)((props) => ({
  boxSizing: 'border-box',
  width: '300px',
  height: '400px',
  padding: '10px',
  margin: '10px',
  boxShadow: '0 2px 4px black',
}));

const Title = styled(Box)((props) => ({
  width: '100%',
  height: '50px',
  textAlign: 'center',
  fontSize: '20px',
  fontWeight: 'bold',
  lineHeight: '50px',
}));

const ButtonBox = styled(Box)((props) => ({
  width: '170px',
  height: '50px',
  display: 'flex',
  alignItems: 'center',
  margin: '0 auto',
}));

const buttonStyle = {
  width: '70px',
  height: '35px',
  color: COLOR.whity,
}

const warningStyle = { 
  height: '20px', 
  lineHeight: '20px',
  mt: '10px',
  fontSize: '13px', 
  fontWeight: 'bold', 
  color: 'red', 
  textAlign: 'center',
}

const Proposal = () => {
  return (
    <Container>
      <Title>제안서</Title>
      <ProposalContent title={'이름'}>
        <MiniProfile />
      </ProposalContent>
      <ProposalContent title={'일시'}>
        <Box sx={{ width: '100%', height: '50px', lineHeight: '50px', }}>
          2022/11/17 10:00~12:00
        </Box>
      </ProposalContent>
      <ProposalContent title={'내용'}>
        <Box
          sx={{
            boxSizing: 'border-box',
            width: '100%',
            height: '135px',
            overflow: 'scroll',
            mt: '15px',
            p: '5px',
            fontSize: '12px',
            boxShadow: `inset 0 0 2px ${COLOR.grey}`
          }}
        >
          박상연입니다.박상연입니다.박상연입니다.박상연입니다.박상연입니다.박상연입니다.박상연입니다.박상연입니다.박상연입니다.박상연입니다.박상연입니다.
          박상연입니다.박상연입니다.박상연입니다.박상연입니다.박상연입니다.박상연입니다.박상연입니다.박상연입니다.박상연입니다.박상연입니다.박상연입니다.
        </Box>
      </ProposalContent>
      <Box sx={warningStyle}>
        * 승낙시 상대방에게 연락처가 전달됩니다.
      </Box>
      <ButtonBox>
        <Button sx={buttonStyle} variant="contained">승낙</Button>
        <Button sx={{...buttonStyle, ml: '30px',}} variant="contained" color='warning' >거절</Button>
      </ButtonBox>
    </Container>
  );
};

export default Proposal;