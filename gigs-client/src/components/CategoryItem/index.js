// refactor 221103

import { Box } from '@mui/system';
import React from 'react';
import { COLOR } from '../../utils/Constants';

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
          border: `.5px solid ${COLOR.grey}`,
          borderRadius: '10px',
          backgroundColor: selected ? COLOR.main : COLOR.whity,
          mr: '10px',
          textAlign: 'center',
          lineHeight: '20px',
          fontSize: 11,
          color: selected ? COLOR.whity : COLOR.blacky,
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