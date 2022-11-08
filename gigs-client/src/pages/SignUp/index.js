import { Button, TextField, Box } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import axios from 'axios';
import { API } from '../../utils/Constants';

const SignUp = () => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  
  const location = useLocation();

  const getUserIdAndName = useCallback(async (uuid) => {
    const response = await axios.get(API.getUserName(uuid));
    console.log(response.data);
    setName(response.data.name);
    setId(response.data.id);
  }, []);

  useEffect(() => {
    const uuid = location.search.substring(6);
    console.log(uuid);

    getUserIdAndName(uuid);
  }, []);

  const handleClick = useCallback(async () => {
    const data = {
      id, name, address, phoneNumber,
    };

    await axios.post(API.signUp(data), data);
  }, [id, name, address, phoneNumber]);

  return (
    <Box>
      <TextField
        placeholder='주소'
        value={name}
      />
      <TextField
        placeholder='주소'
        value={address}
        onChange={(e) => {
          setAddress(e.target.value);
        }}
      />
      <TextField
        placeholder='연락처'
        value={phoneNumber}
        onChange={(e) => {
          setPhoneNumber(e.target.value);
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