import { Button, TextField, Box } from '@mui/material';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Cookies } from 'react-cookie';

const SignUpTest = () => {
  const [data, setData] = useState("");

  const location = useLocation();
  
  const cookies = new Cookies();
  const ck = cookies.getAll();
  console.log(ck);

  return (
    <Box>
      <TextField
        value={data}
        onChange={(e) => {
          setData(e);
        }}
      ></TextField>
      <Button>
        제출
      </Button>
    </Box>
  );
};

export default SignUpTest;