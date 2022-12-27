import { Box } from '@mui/material';
import React, { useCallback, useRef } from 'react';
import Swal from 'sweetalert2';
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
  objectFit: 'cover',
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
  target,
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
      const response = await updateRepImage(target, formData);
      console.log('# 대표 이미지 업로드 결과');
      console.log(response);

      // 보여지는 이미지 수정
      handleEditRepImg(response.data);
    } catch (err) {
      const statusCode = err.response.status;
      const msg = err.response.data.message;
      console.log(statusCode);
      console.log(msg);
      if(statusCode === 400 && msg.indexOf('Maximum upload size exceeded') >= 0) {
        Swal.fire({
          icon: "warning",
          title: "1MB 보다 큰 이미지는 업로드할 수 없습니다.",
          confirmButtonText: "확인"
        })
      }
      console.log(err);
    }
  }, [target, handleEditRepImg]);

  return (
    <Box sx={containerStyle}>
      {editable ? (
        <input type="file"
        accept='image/*'
        onChange={updateRepImg}
        value={''}
        ref={repImgInput}
        style={{ display: "none" }}
      />
      ) : (<></>)}
      {repImg ? (
        editable ? (
          <img src={repImg} alt="repImg" width="100%" height='300px' style={repImgStyle} onClick={() => repImgInput.current.click()} />
        ) : (
          <img src={repImg} alt="repImg" width="100%" />
        )
      ) : (
        <Box sx={repImgMsgStyle} onClick={editable ? (() => repImgInput.current.click()) : null}>
          대표 이미지를 등록해주세요.
        </Box>
      )}
    </Box>
  );
};

export default RepImgBox;