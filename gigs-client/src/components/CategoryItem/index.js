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
          height: '30px',
          border: `.5px solid ${COLOR.grey}80`,
          backgroundColor: selected ? COLOR.main : 'white',
          textAlign: 'center',
          lineHeight: '30px',
          fontSize: '10px',
          color: selected ? COLOR.whity : COLOR.blacky,
          cursor: 'pointer',
          transition: '.25s all ease',
          userSelect: 'none',
        }}
        onClick={() => selectItem(children)}
      >
        {ENUM[children]}
      </Box>
    </>
  );
};

export default CategoryItem;