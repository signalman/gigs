import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, Divider, Modal } from '@mui/material';
import DaumPostCode from 'react-daum-postcode';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  p: 4,
};

const SignUp = (

) => {

  const onhandlePost = async (data) => {
    const { name, address, detail_address, contact } = data;
    const postData = { name, address, detail_address, contact };
    console.log(postData)
    await axios
      .post('', postData)
      .then(function (response) {
        console.log(response, '성공');

      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const JoinData = {
      name: data.get('name'),
      address: data.get('address'),
      detail_address: data.get('detail_address'),
      contact: data.get('contact')
    };

    console.log(JoinData)
    onhandlePost(JoinData)
  }

  const [openPostcode, setOpenPostcode] = useState(false);

  const [address, setaddress] = useState("");

  // 주소 모달 관련
  const handle = {
    Open: () => { setOpenPostcode(true); },

    Close: () => { setOpenPostcode(false); },

    selectAddress: (data) => {
      console.log(data)
      console.log('주소 : ' + data.address + '우편번호:' + data.zonecode)
      setaddress(data.address)
      console.log(address)
      setOpenPostcode(false);
    }
  }

  return (
    <Box component='form' onSubmit={handleSubmit} sx={{ flexGrow: 1, px: 3 }}>
      <Paper
        sx={{
          my: 1,
          mx: 'auto',
          p: 2,
          width: 500,
        }}
      >
        <Typography sx={{ fontSize: 19, fontWeight: 'bold', pl: 3 }}>회원가입</Typography>
        <Divider />
        <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 4, mt: 5 }}>
          <Typography sx={{ fontWeight: 'bold', mr: 1 }}>이름</Typography>
          <TextField
            required
            name="name"
            variant="standard"
          />
        </Box>
        <Divider />
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 4, mb: 4 }}>
          <Typography sx={{ fontWeight: 'bold', mr: 1 }}>주소</Typography>
          <Button variant="contained"
            onClick={handle.Open}
            sx={{ mr: 2, ml: 1, width: 90 }}>
            검색
          </Button>
          <Modal
            open={openPostcode}
            onClose={handle.Close}>
            <Box sx={style}>
              <DaumPostCode
                onComplete={handle.selectAddress}
                autoClose={false}
              />
            </Box>
          </Modal>
          <TextField
            required
            variant="standard"
            name="address"
            InputProps={{
              readOnly: true,
            }}
            value={address}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 4 }}>
          <Typography sx={{ fontWeight: 'bold', fontSize: 14, mr: 1, ml: 8 }}>상세주소</Typography>
          <TextField
            required
            variant="standard"
            name="detail_address"
          />
        </Box>
        <Divider />
        <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2, mt: 2 }}>
          <Typography sx={{ fontWeight: 'bold', mr: 1 }}>연락처</Typography>
          <TextField
            required
            variant="standard"
            name="contact"
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Button variant="contained"
            type="submit"
            sx={{ mr: 2, ml: 1, width: 90 }}>
            무대가입
          </Button>
          <Button variant="contained"
            onClick
            sx={{ mr: 2, ml: 1, width: 90 }}>
            스타가입
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default SignUp;