import styled from '@emotion/styled';
import { Box, Grid, TextField } from '@mui/material';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { COLOR } from '../../utils/Constants';
import StageImg from '../../images/stage_tmp.jpg';
import ImageItem from './ImageItem';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import { deleteImage, updateSubImage } from '../../utils/Api';

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
  images,
  editable,
  handleEditImgs,
  handleDeleteImg,
}) => {
  const [selectedImage, setSelectedImage] = useState(-1);
  
  const imgInputRef = useRef();

  const handleImgClick = useCallback((imgId) => {
    setSelectedImage(imgId);
  }, []);

  const handleDeleteImgClick = useCallback(async () => {
    try {
      const response = await deleteImage(selectedImage);
      console.log('# 이미지 삭제 결과');
      console.log(response);

      // 이미지 리스트에서 해당 이미지 삭제
      handleDeleteImg(selectedImage);

      // 선택한 이미지 초기화
      setSelectedImage(-1);
    } catch (err) {
      console.log(err);
    }
  }, [selectedImage, handleDeleteImg]);
  
  // 이미지 추가
  const addImgs = useCallback(async (e) => {
    const files = Array.from(e.target.files);
    console.log('# 업로드할 이미지 리스트');
    console.log(files);

    const formData = new FormData();
    files?.forEach(file => formData.append('files', file));

    try {
      const response = await updateSubImage(formData)
      console.log('# 이미지 업로드 결과');
      console.log(response)

      // 보여지는 이미지 수정
      handleEditImgs(response.data);
    } catch (err) {
      console.log(err);
    }
  }, [handleEditImgs]);

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
              {selectedImage === -1 ? (
                <Box sx={{ width: '500px', height: '500px', lineHeight: '500px', textAlign: 'center', color: COLOR.grey, fontSize: '20px', }}>
                  선택한 이미지가 없습니다.
                </Box>
              ) : (
                <img src={images?.find(img => img.imgId === selectedImage).url} alt="stage_img" width='100%' />
              )}
            </Box>
            {editable && selectedImage !== -1 ? (
              <Box sx={{ m: '0 auto', boxShadow: '0 0 4px grey', display: 'flex', backgroundColor: 'white', width: '40px', borderRadius: '10px', overflow: 'hidden' }}>
                {/* <IconButton size='40px'>
                  <BookmarkAddIcon sx={{ width: '25px', height: '25px'}} />
                </IconButton> */}
                <IconButton size='40px' onClick={handleDeleteImgClick} >
                  <DeleteForeverIcon sx={{ width: '25px', height: '25px'}} />
                </IconButton>
              </Box>
            ) : (<></>)}
          </Box>
        </Content>
        <Content>
          <Box sx={{ width: '500px', backgroundColor: 'white', minHeight: '500px', display: 'flex', flexWrap: 'wrap', alignContent: 'flex-start', }}>
            {images?.map(image => (
              <ImageItem key={image.imgId} image={image} onImgClick={handleImgClick} />              
            ))}
            {editable ? (
              <IconButton size='100px'>
                <input
                  type="file"
                  accept='image/*'
                  multiple
                  onChange={addImgs}
                  ref={imgInputRef}
                  style={{ display: "none" }}
                />
                <AddAPhotoIcon sx={{ width: '50px', height: '50px' }} onClick={() => imgInputRef.current.click()} />
              </IconButton>
            ) : (<></>)}
          </Box>
        </Content>
      </Body>
    </Container>
  );
};

export default ImageBox;