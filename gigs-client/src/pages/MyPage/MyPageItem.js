import { Box } from '@mui/material';
import React from 'react';

const MyPageItem = ({
  title,
  children,
}) => {
  return (
    <Box sx={{ width: '100%', marginBottom: '50px', position: 'relative', }}>
      <Box
        sx={{
          width: '100%',
          height: '50px',
          lineHeight: '50px',
          textIndent: '50px',
          borderBottom: '1px solid black',
          fontSize: '20px',
          fontWeight: 'bold',
        }}
      >
        {title}
      </Box>
      <Box
        sx={{
          width: '100%',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default MyPageItem;