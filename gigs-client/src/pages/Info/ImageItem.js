import styled from '@emotion/styled';
import { Box, Grid } from '@mui/material';
import React from 'react';
import { COLOR } from '../../utils/Constants';

const Item = styled(Box)((props) => ({
  position: 'absolute',
  top: 0, left: 0,
  width: '100px', height: '100px',
  display: 'flex',
  alignItems: 'center',
  zIndex: 0,
  backgroundColor: 'white',
  cursor: 'pointer',
  transition: '.5s ease',
  "&:hover": {
    top: -5, left: -5,
    width: '110px', height: '110px',
    zIndex: 100,
    boxShadow: `0 0 4px ${COLOR.grey}`,
  }
}));

const ImageItem = ({
  image,
  onImgClick,
}) => {
  const {imgId, url} = image;
  return (
    <Box sx={{ width: '100px', height: '100px', position: 'relative'}} onClick={() => onImgClick(imgId)}>
      <Item>
        <img src={url} alt="stageImg" width='100%' />
      </Item>
    </Box>
  );
};

export default ImageItem;