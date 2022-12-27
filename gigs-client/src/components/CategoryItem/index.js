// refactor 221103

import { Box } from '@mui/system';
import React from 'react';
import { COLOR, ENUM } from '../../utils/Constants';

const CategoryItem = ({
  children,
  selected,
  selectItem,
}) => {
  return (
    <>
      <Box
        sx={{
          boxSizing: 'border-box',
          width: '50px',
          height: '20px',
          border: `.5px solid ${COLOR.grey}`,
          backgroundColor: selected ? COLOR.main : COLOR.whity,
          textAlign: 'center',
          lineHeight: '20px',
          fontSize: '10px',
          color: selected ? COLOR.whity : COLOR.blacky,
          cursor: 'pointer',
        }}
        onClick={() => selectItem(children)}
      >
        {ENUM[children]}
      </Box>
    </>
  );
};

export default CategoryItem;