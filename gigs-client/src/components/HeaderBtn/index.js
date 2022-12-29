// refactor 221103

import { Button } from '@mui/material';
import React from 'react';
import { COLOR } from '../../utils/Constants';

const HeaderBtn = ({
  children,
  isClicked,
  handleClick,
}) => {
  return (
    <Button
      sx={{
        fontSize: 25,
        fontWeight: 'bold',
        letterSpacing: '0.25px',
        p: 0,
        mx: 4,
        color: isClicked ? 'primary' : COLOR.blacky,
      }}
      variant='text'
      onClick={handleClick}
    >
      {children}
    </Button>
  );
};

export default HeaderBtn;