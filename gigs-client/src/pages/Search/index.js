import { Box, Grid, MenuItem, Select } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { API, PATH, SYMBOL } from '../../utils/Constants';
import axios from 'axios';
import StarSearchConditionBox from '../../components/StarSearchConditionBox';
import StageSearchConditionBox from '../../components/StageSearchConditionBox';
import StarCard from '../../components/StarCard';
import StageCard from '../../components/StageCard';
import SortBar from '../../components/SortBar';

const PAGE_SIZE = Math.ceil(window.innerHeight / 500) * 3;

const debounce = (callback, limit) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback.apply(this, args);
    }, limit);
  }
};

const Search = ({
  target,
}) => {
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
  
  const fetchDataForStage = useCallback( async (newConditions = {}, newSort = "") => {
    newConditions = newConditions || conditions;
    newSort = newSort || sort;

    try {
      const response = await axios.get(API.getStageCards(newConditions, newSort, PAGE_SIZE, 0));

      const data = response.data;
      setCards(data);
      setPage(1);
    } catch (e) {
      console.log(e);
      
      setCards([1, 2, 3, 4, 5, 6]);
      setPage(1);
    }
  }, [conditions, sort]);

  const fetchDataForStagePaging = useCallback(async () => {
    try {
      const response = await axios.get(API.getStageCards(conditions, sort, PAGE_SIZE, page));
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

  const star_dummy = {
    starId:1,
    starName:"Oasis",
    avgScore:2,
    starAddress:"경기도 수원시 영통구",
    memberNumber:3,
    gender:"남성",
    showCount:5,
    starImgUrl:"img/star_tmp.jpg",
    starGenres:[
    {starGenreId : 1, genreName : "팝송"},
    {starGenreId : 2, genreName : "발라드"}],
    starStageTypes:[
    {starStageTypeId: 1, genreName : "카페"},
    {starStageTypeId : 2, genreName : "길거리"}]
  }

  useEffect(() => {
  }, []);

  useEffect(() => {
    switch(target) {
      case SYMBOL.star:
        fetchDataForStar();
        break;
      case SYMBOL.stage:
        fetchDataForStage();
    }
  }, [target]);

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

  // 무한 스크롤 시 데이터 가져오기
  useEffect(() => {
    console.log("scroll!")
    if(isFetching && hasNextPage) {
      switch(target) {
        case SYMBOL.star:
          fetchDataForStarPaging();
          break;
        case SYMBOL.stage:
          fetchDataForStagePaging();
      }
    } else if(!hasNextPage) setFetching(false);
  }, [isFetching, target]);

  // 정렬 변경 시
  const handleSortChange = useCallback((e) => {
    const newSort = e.target.value;
    setSort(newSort);

    switch(target) {
      case SYMBOL.star:
        fetchDataForStar(conditions, newSort);
        break;
      case SYMBOL.stage:
        fetchDataForStage(conditions, newSort);
        break;
    }

  }, [target, conditions]);

  return (
    <>
      <Box
        sx={{
          width: `100%`,
        }}
      >
        <Box
          sx={{ width: '100%', mb: `50px`}}>
          {target === SYMBOL.star ?
          (<StarSearchConditionBox target={target} fetchData={fetchDataForStar} setConditions={setConditions} setParentSort={setSort} />) :
          (<StageSearchConditionBox target={target} fetchData={fetchDataForStage} setConditions={setConditions} setParentSort={setSort} />)}
        </Box>
        <Box
          sx={{
            width: '100%',
            height: '50px',
            display: 'flex',
            position: 'relative',
          }}
        >
          <Select
            sx={{
              position: 'absolute',
              right: 15,
              top: 0,
              width: '100px',
              height: '30px',
            }}
            variant='standard'
            value={sort}
            onChange={handleSortChange}
          >
            <MenuItem value='dateDesc'>최신순</MenuItem>
            <MenuItem value='rateDesc'>별점순</MenuItem>
            <MenuItem value='reviewDesc'>리뷰순</MenuItem>
          </Select>
        </Box>
        <Box
          sx={{
            width: '100%',
          }}
        >
          <Grid container spacing={'75px'} sx={{ pl: '75px', }}>
            {cards?.map((card, i) => (
              <Grid item key={i}>
                <StarCard
                  starId={star_dummy.starId}
                  starName={star_dummy.starName}
                  avgScore={star_dummy.avgScore}
                  starAddress={star_dummy.starAddress}
                  memberNumber={star_dummy.memberNumber}
                  gender={star_dummy.gender}
                  showCount={star_dummy.showCount}
                  starGenres={star_dummy.starGenres}
                  starStageTypes={star_dummy.starStageTypes}
                  starImgUrl={star_dummy.starImgUrl}
                  />
              </Grid>  
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Search;