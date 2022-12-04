import { Box } from '@mui/material';
import React, { useCallback, useRef } from 'react';
import { updateRepImage } from '../../utils/Api';
import { COLOR, IMG } from '../../utils/Constants';

const containerStyle = {
  width: '100%',
  height: '300px',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent:'center',
  mt: '2px',
};

const repImgStyle ={
  cursor: 'pointer',
};

const repImgMsgStyle = {
  boxSizing: 'border-box',
  padding: '10px',
  margin: '135px auto',
  height: '50px',
  lineHeight: '26px',
  textAlign: 'center',
  border: `2px solid ${COLOR.main}`,
  color: COLOR.main,
  fontWeight: 'bold',
  borderRadius: '10px',
  userSelect: 'none',
  cursor: 'pointer',
};

const RepImgBox = ({
  repImg,
  editable,
  handleEditRepImg,
}) => {
  const repImgInput = useRef();

  const updateRepImg = useCallback(async (e) => {
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    console.log('# 업로드할 대표 이미지');
    console.log(e.target.files[0]);

    try {
      const response = await updateRepImage(formData);
      console.log('# 대표 이미지 업로드 결과');
      console.log(response);

      // 보여지는 이미지 수정
      handleEditRepImg(URL.createObjectURL(e.target.files[0]));
    } catch (err) {
      console.log(err);
    }
  }, [handleEditRepImg]);

  return (
    <Box sx={containerStyle}>
      {repImg ? (
        editable ? (
          <>
            <input type="file"
              accept='image/*'
              onChange={updateRepImg}
              ref={repImgInput}
              style={{ display: "none" }}
            />
            <img src={repImg} alt="repImg" width="100%" style={repImgStyle} onClick={() => repImgInput.current.click()} />
          </>
        ) : (
          <img src={repImg} alt="repImg" width="100%" />
        )
      ) : (
        <Box sx={repImgMsgStyle}>
          대표 이미지를 등록해주세요.
        </Box>
      )}
    </Box>
  );
};

export default RepImgBox;