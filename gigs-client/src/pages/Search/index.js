import { Box, Grid } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { API, PATH, SYMBOL } from '../../utils/Constants';
import axios from 'axios';
import SearchConditionBox from '../../components/SearchConditionBox';

const PAGE_SIZE = Math.ceil(window.innerHeight / 500) * 3;
const DEV = false;

const debounce = (callback, limit) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback.apply(this, args);
    }, limit);
  }
};

const Search = () => {
  const [target, setTarget] = useState(null);
  const [conditions, setConditions] = useState({});
  const [sort, setSort] = useState("dateDesc");
  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(1);
  const [isFetching, setFetching] = useState(false);
  const [hasNextPage, setNextPage] = useState(true);

  const fetchDataForStar = useCallback( async (newConditions = {}, newSort = "") => {
    newConditions = newConditions || conditions;
    newSort = newSort || sort;

    try {
      const response = await axios.get(API.getStarCards(newConditions, newSort, PAGE_SIZE, 0));

      const data = response.data;
      setCards(data);
      setPage(1);
    } catch (e) {
      console.log(e);
      
      setCards([1, 2, 3, 4, 5, 6]);
      setPage(1);
    }
  }, [conditions, sort]);
  // TODO: fetchDataForStage

  useEffect(() => {
    if(DEV) {
      const newCards = [];
      for(let i=0; i<PAGE_SIZE; i++) newCards.push(i);
      setCards(newCards);
      return;
    }
    // check pathname
    const pathname = window.location.pathname;
    if(pathname.indexOf(PATH.searchStar) > -1) {
      setTarget(SYMBOL.star);
      fetchDataForStar();
    }
  }, []);

  // 무한 스크롤 이벤트 등록
  useEffect(() => {
    const handleScroll = debounce(() => {
      const { scrollTop, offsetHeight } = document.documentElement;
      if(window.innerHeight + scrollTop >= offsetHeight) {
        setFetching(true);
      }
    }, 100);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const fetchDataForStarPaging = useCallback(async () => {
    try {
      const response = await axios.get(API.getStarCards(conditions, sort, PAGE_SIZE, page));
      const data = response.data;
      setCards(data);
      setPage(page+1);
      setFetching(false);
      // TODO: hasNext 처리
    } catch (e) {
      console.log(e);
      setCards([...cards, 1, 2, 3, 4, 5, 6]);
      setPage(page+1);
      setFetching(false);
    }
  }, [cards, conditions, sort, page]);

  // 무한 스크롤 시 데이터 가져오기
  useEffect(() => {
    console.log("scroll!")
    if(isFetching && hasNextPage) {
      if(target === SYMBOL.star) {
        fetchDataForStarPaging();
      }
    } else if(!hasNextPage) setFetching(false);
  }, [isFetching]);

  return (
    <>
      <Box
        sx={{
          width: `100%`,
        }}
      >
        <Box
          sx={{ width: '100%', }}>
          <SearchConditionBox fetchDataForStar={fetchDataForStar} setConditions={setConditions} setParentSort={setSort} />
        </Box>
        <Box
          sx={{
            width: '100%',
          }}
        >
          <Grid container spacing={'75px'} sx={{ pl: '75px', }}>
            {cards?.map((card, i) => (
              <Grid item key={i}>
                <Box sx={{width: '300px', height: '450px', backgroundColor: 'red',}}></Box>
              </Grid>  
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Search;