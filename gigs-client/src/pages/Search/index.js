import { Box, Grid } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { API, PATH, SYMBOL } from '../../utils/Constants';
import axios from 'axios';
import SearchConditionBox from '../../components/SearchConditionBox';
import StarCard from '../../components/StarCard';
import StageCard from '../../components/StageCard';

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

const stage_dummy = {
  hostId:1,
  stageName:"카페",
  avgScore:2,
  stageAddress:"경기도 수원시 영통구",
  stageSize:34,
  age:20,
  //gender:"남성",
  stageStartTime:"10:00",
  stageEndTime:"22:00",
  showCount:5,
  stageCost:10,
  stageImgUrl:"img/stage_tmp.jpg",
  stageGenres:[
  {stageGenreId : 1, genreName : "팝송"},
  {stageGenreId : 2, genreName : "발라드"}],
  stageTypes:[
  {stageTypeId: 1, genreName : "카페"},
]
}

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
      <StageCard
      hostId={stage_dummy.hostId}
      stageName={stage_dummy.stageName}
      avgScore={stage_dummy.avgScore}
      stageAddress={stage_dummy.stageAddress}
      stageSize={stage_dummy.stageSize}
      age={stage_dummy.age}
      //gender:"남성",
      stageStartTime={stage_dummy.stageStartTime}
      stageEndTime={stage_dummy.stageEndTime}
      showCount={stage_dummy.showCount}
      stageCost={stage_dummy.stageCost}
      stageImgUrl={stage_dummy.stageImgUrl}
      stageGenres={stage_dummy.stageGenres}
      stageTypes={stage_dummy.stageTypes}
      />
    </>
  );
};

export default Search;