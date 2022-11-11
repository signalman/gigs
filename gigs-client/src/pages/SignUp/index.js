import React, { useState, useEffect, useCallback } from 'react';
import { Box, Button, TextField, Typography, Paper, Divider, Modal } from '@mui/material';
import DaumPostCode from 'react-daum-postcode';
import { useLocation, useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import axios from 'axios';
import { API } from '../../utils/Constants';
import { IMaskInput } from 'react-imask';

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

  const [name, setName] = useState("");
  const [uid, setUid] = useState("");
  const [address, setAddress] = useState("");
  const [detail, setDetail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [siDo, setSiDo] = useState("");
  const [siGun, setSiGun] = useState("");
  const [road, setRoad] = useState("");
  const [role, setRole] = useState("");

  const [openPostcode, setOpenPostcode] = useState(false);

  const getUserIdAndName = useCallback(async (uuid) => {
    const response = await axios.get(API.getUserName(uuid));

    setName(response.data.name);
    setUid(response.data.uid);
    //console.log(uid)
    //console.log(response.data)
  }, []);

const location = useLocation();
const navigate = useNavigate();

useEffect(() => {
const uuid = location.search.substring(6);

    getUserIdAndName(uuid);
  }, []);

  const onhandlePost = useCallback(async () => {
    const data = {
      uid, name, siDo, siGun, road, detail, phoneNumber, role
    };

    console.log(data)
    await axios.post(API.signUp(data), data)
    .then(function (response) {
      if (response.status === 200) {
          // axios.get('http://localhost:8080/wait').then(function (response) {
          //     console.log(response)
          // }).catch(function (err) {
          //   console.log(err)
          // }) 
        navigate('/main')
      }
    }).catch(function (err) {
      console.log(err);
    });
  }, [uid, name, siDo, siGun, road, detail, phoneNumber, role]);

  // const onhandlePost = async (data) => {
  //   const { name, id,  address, detail_Address, phoneNumber } = data;
  //   const postData = { name, address, detail_Address, phoneNumber };
  //   console.log(postData)
  //   await axios
  //     .post('', postData)
  //     .then(function (response) {
  //       console.log(response, '성공');

  //     })
  //     .catch(function (err) {
  //       console.log(err);
  //     });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    onhandlePost()
  }

  // 주소 모달 관련
  const handle = {
    Open: () => { setOpenPostcode(true); },

    Close: () => { setOpenPostcode(false); },

    selectAddress: (data) => {
      setAddress(data.address)
      setSiDo(data.sido)
      setSiGun(data.sigungu)
      setRoad(data.roadname + " " + data.addressEnglish.split(',')[0])
      setOpenPostcode(false);
    }
  }

  const clickStage = () => {
    setRole('ROLE_HOST')
  }

  const clickStar = () => {
    setRole('ROLE_STAR')
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
            InputProps={{
              readOnly: true,
            }}
            value={name}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 4, mt: 5 }}>
          <Typography sx={{ fontWeight: 'bold', mr: 1 }}>닉네임</Typography>
          <TextField
            required
            name="nickName"
            variant="standard"
            InputProps={{
              readOnly: true,
            }}
            value={uid}
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
            name="detail_Address"
            onChange={(e) => {
              setDetail(e.target.value);
            }}
          />
        </Box>
        <Divider />
        <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2, mt: 2 }}>
          <Typography sx={{ fontWeight: 'bold', mr: 1 }}>연락처</Typography>
          {/* <TextField
            required
            variant="standard"
            name="phoneNumber"
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
          /> */}
          <IMaskInput
            mask="000-0000-0000"
            definitions={{
              '#': /[1-9]/,
            }}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Button variant="contained"
            type="submit"
            onClick={clickStage}
            sx={{ mr: 2, ml: 1, width: 90 }}>
            무대가입
          </Button>
          <Button variant="contained"
            type="submit"
            onClick={clickStar}
            sx={{ mr: 2, ml: 1, width: 90 }}>
            스타가입
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default SignUp;