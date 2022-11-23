import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { COLOR } from '../../utils/Constants';
import EditIcon from '@mui/icons-material/Edit';

const Container = styled(Box)((props) => ({
  width: '1100px',
  margin: '0 auto',
  marginTop: '50px',
  paddingLeft: '50px',
  paddingRight: '50px',
  boxShadow: `0 2px 2px ${COLOR.blacky}`,
}));

const Title = styled(Typography)((props) => ({
  height: '50px',
  lineHeight: '50px',
  fontSize: '20px',
  fontWeight: 'bold',
  borderBottom: '1px solid black',
  position: 'relative',
}));

const Content = styled(Box)((props) => ({
  paddingTop: '25px',
  paddingBottom: '25px',
}));

const EditIconBox = styled(Box)((props) => ({
  position: 'absolute',
  top: 0, right: 0,
  width: '50px',
  height: '50px',
  cursor: 'pointer',
}));

const Introduction = ({
  editable,
  openEditIntroduceDialog,
  introduce,
}) => {
  return (
    <Container>
      <Title>
        소개글
        {editable ? (
          <EditIconBox onClick={() => openEditIntroduceDialog()}>
            <EditIcon sx={{ m: '10px', }} />
          </EditIconBox>
        ) : (<></>)}
      </Title>
      <Content dangerouslySetInnerHTML={{__html: introduce}} />
    </Container>
  );
};

export default Introduction;