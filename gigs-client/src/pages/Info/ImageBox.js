import styled from '@emotion/styled';
import { Box, Grid, TextField } from '@mui/material';
import React, { useState, useEffect, useCallback } from 'react';
import { COLOR } from '../../utils/Constants';
import StageImg from '../../images/stage_tmp.jpg';
import ImageItem from './ImageItem';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';

const Container = styled(Box)(() => ({
  width: '1200px',
  margin: '0 auto',
  marginTop: '25px',
}));

const Header = styled(Box)((props) => ({
  width: '1200px',
  display: 'flex',
  height: '50px',
  borderBottom: '2px solid black',
}));

const Title = styled(Box)((props) => ({
  width: '50%',
  height: '50px',
  lineHeight: '50px',
  textIndent: '50px',
  fontSize: '20px',
  fontWeight: 'bold',
  color: COLOR.blacky,
}));

const Body = styled(Box)((props) => ({
  width: '1200px',
  display: 'flex',
  backgroundColor: COLOR.whity,
}));

const Content = styled(Box)((props) => ({
  width: 'calc(600px - 100px)',
  margin: '25px 50px',
  display: 'flex',
  justifyContent: 'center',
}));

const IconButton = styled(Box)((props) => ({
  width: props.size,
  height: props.size,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  backgroundColor: 'white',
  color: COLOR.main,
  transition: '.5s all ease',
  "&:hover": {
    backgroundColor: COLOR.main,
    color: 'white',
  }
}));

const ImageBox = ({
  posts,
  setPosts,
  editable,
}) => {
  

  return (
    <Container>
      <Header>
        <Title>
          선택한 이미지
        </Title>
        <Title>
          이미지들
        </Title>
      </Header>
      <Body>
        <Content>
          <Box sx={{ width: '500px', }}>
            <Box sx={{ width: '500px', height: '500px', display: 'flex', alignItems: 'center', }}>
              <img src={StageImg} alt="stage_img" width='100%' />
            </Box>
            <Box sx={{ m: '0 auto', boxShadow: '0 0 4px grey', display: 'flex', backgroundColor: 'white', width: '80px', borderRadius: '10px', overflow: 'hidden' }}>
              <IconButton size='40px'>
                <BookmarkAddIcon sx={{ width: '25px', height: '25px'}} />
              </IconButton>
              <IconButton size='40px'>
                <DeleteForeverIcon sx={{ width: '25px', height: '25px'}} />
              </IconButton>
            </Box>
          </Box>
        </Content>
        <Content>
          <Box sx={{ width: '500px', backgroundColor: 'white', minHeight: '500px', display: 'flex', flexWrap: 'wrap', alignContent: 'flex-start', }}>
            <ImageItem />
            <ImageItem />
            <ImageItem />
            <ImageItem />
            <ImageItem />
            <ImageItem />
            <ImageItem />
            <ImageItem />
            <ImageItem />
            <ImageItem />
            <IconButton size='100px'>
              <AddAPhotoIcon sx={{ width: '50px', height: '50px' }} />
            </IconButton>
          </Box>
        </Content>
      </Body>
    </Container>
  );
};

export default ImageBox;