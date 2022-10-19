import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { API } from '../../utils/Constants';
import axios from 'axios';

const Search = () => {
  const [starCards, setStarCards] = useState([]);

  useEffect(() => {
    const getStarCards = async () => {
      const response = await axios.get(API.getStarCards('', [], [], '', '', 'dateDesc'));

      return response.data;
    }
    
    const data = getStarCards();
    setStarCards(data);
  }, []);

  return (
    <>
      <Box
        sx={{
          width: `100%`,
        }}
      >
        <Box
          sx={{
            width: '100%',
          }}
        >

        </Box>
        <Box
          sx={{
            width: '100%',
          }}
        >

        </Box>
      </Box>
    </>
  );
};

export default Search;