// refactor 221103

import { Button } from '@mui/material';
import React from 'react';

const LogoBtn = ({
  children,
  handleClick,
}) => {
  return (
    <Button onClick={handleClick}>
      {children}
    </Button>
  );
};

export default LogoBtn;