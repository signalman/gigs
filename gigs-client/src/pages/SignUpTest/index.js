import { Button, TextField, Box } from '@mui/material';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const SignUpTest = () => {
  const [data, setData] = useState("");

  const location = useLocation();



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