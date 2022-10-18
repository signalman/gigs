import { Button } from '@mui/material';
import React from 'react';

const HeaderBtn = ({
  children,
  isClicked,
  handleClick,
}) => {
  return (
    <>
      <Button
        sx={{
          fontSize: 30,
          fontWeight: 'bold',
          letterSpacing: '0.25px',
          p: 0,
          mx: 3,
          color: isClicked ? '#D00E64' : 'black',
        }}
        variant='text'
        onClick={handleClick}
      >
        {children}
      </Button>
    </>
  );
};

export default HeaderBtn;