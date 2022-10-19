import { Box } from '@mui/system';
import React from 'react';

const CategoryItem = ({
  children,
  selected,
  selectItem,
}) => {
  return (
    <>
      <Box
        sx={{
          width: '70px',
          height: '20px',
          border: '.5px solid #808080',
          borderRadius: '10px',
          backgroundColor: selected ? '#D046D2' : '#f8f8f8',
          mr: '10px',
          textAlign: 'center',
          lineHeight: '20px',
          fontSize: 11,
          color: selected ? '#f8f8f8' : '#404040',
          cursor: 'pointer',
        }}
        onClick={() => selectItem(children)}
      >
        {children}
      </Box>
    </>
  );
};

export default CategoryItem;