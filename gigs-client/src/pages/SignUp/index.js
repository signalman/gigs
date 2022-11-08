import { Button, TextField, Box } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import axios from 'axios';
import { API } from '../../utils/Constants';

const SignUp = () => {
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  
  const location = useLocation();
  const cookies = new Cookies();
  const ck = cookies.getAll();

  const getUserIdAndName = useCallback(async (uuid) => {
    console.log("shoot");
    await axios.get(API.getUserName(uuid));
  }, []);

  useEffect(() => {
    const uuid = location.search.substring(6);
    console.log(uuid);

    getUserIdAndName(uuid);
  }, []);

  const handleClick = useCallback(async () => {
    const id = cookies.get('id');
    const name = cookies.get('name');
    const data = {
      id, name, address, phoneNumber,
    };

    await axios.get(API.signUp(data));
  }, []);

  return (
    <Box>
      <TextField
        placeholder='주소'
        value={address}
        onChange={(e) => {
          setPhoneNumber(e.target.value);
        }}
      />
      <TextField
        placeholder='연락처'
        value={phoneNumber}
        onChange={(e) => {
          setAddress(e.target.value);
        }}
      />
      <Button
        onClick={handleClick}
      >
        제출
      </Button>
    </Box>
  );
};

export default SignUp;