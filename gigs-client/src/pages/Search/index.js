import { Box, Grid, MenuItem, Select } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { API, SYMBOL } from '../../utils/Constants';
import axios from 'axios';
import StarSearchConditionBox from '../../components/StarSearchConditionBox';
import StageSearchConditionBox from '../../components/StageSearchConditionBox';
import StarCard from '../../components/StarCard';
import StageCard from '../../components/StageCard';

// 카드를 불러올 때, 한 페이지당 몇 개의 카드를 불러올 지 결정하는 변수
const PAGE_SIZE = Math.ceil(window.innerHeight / 500) * 3;

const star_dummy = {
  starId:1,
  starName:"Oasis",
  avgScore:2.4,
  starAddress:"경기도 수원시 영통구",
  memberNumber:3,
  gender:"남성",
  showCount:5,
  starImgUrl:"img/star_tmp.jpg",
  starGenres:[
  {starGenreId : 1, genreName : "팝송"},
  {starGenreId : 2, genreName : "발라드"}],
  starStageTypes:[
  {starStageTypeId: 1, stageTypeName : "카페"},
  {starStageTypeId : 2, stageTypeName : "길거리"}],
  reviewCount: 15,
}

const stage_dummy = {
  hostId:1,
  stageName:"스타벅스",
  avgScore:4.1,
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
    {stageGenreId : 2, genreName : "발라드"},
    {stageGenreId : 3, genreName : "랩"}],
  stageType: "카페",
  reviewCount: 10,
}

const debounce = (callback, limit) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback.apply(this, args);
    }, limit);
  }
};

/**
 * 스타/무대 찾는 페이지
 * @param target 스타/무대 중 찾으려는 항목 (Symbol)
 * @returns 
 */
const Search = ({
  target,
}) => {
  const [conditions, setConditions] = useState({});   // 조건 상자에서 검색을 누른 시점의 조건들
  const [sort, setSort] = useState("dateDesc");       // 정렬 조건
  const [cards, setCards] = useState([]);             // 카드 리스트
  const [page, setPage] = useState(1);                // 무한 스크롤에서 현재 페이지
  // 무한 스크롤에서 현재 데이터를 가져오고 있는 지 여부
  // true라면 데이터를 가져오지 않음
  const [isFetching, setFetching] = useState(false);
  const [hasNextPage, setNextPage] = useState(true);  // 무한 스크롤에서 다음 페이지가 존재하는 지 여부

  /**
   * 스타 카드를 가져오는 async function,
   * 1 페이지의 데이터만 가져옴
   * @param newConditions 특정 조건을 Object로 전달하면 해당 조건으로 검색
   * @param newSort 특정 정렬 조건을 String으로 전달하면 해당 정렬 조건으로 검색 
   */
  const fetchDataForStar = useCallback( async (newConditions = {}, newSort = "") => {
    // 특정 조건이나 정렬 조건이 존재하지 않으면 state 로 저장된 조건으로 검색함
    newConditions = newConditions || conditions;
    newSort = newSort || sort;

    try {
      const response = await axios.get(API.getStarCards(newConditions, newSort, PAGE_SIZE, 0));

      const data = response.data;
      setCards(data);
      setPage(1);
    } catch (e) {
      // TODO: 예외 처리
      console.log(e);
      
      setCards([1, 2, 3, 4, 5, 6]);
      setPage(1);
    }
  }, [conditions, sort]);

  /**
   * 무한 스크롤 시 스타 카드를 페이징하여 가져오는 async function,
   * State에 저장된 page 를 참조함
   */
  const fetchDataForStarPaging = useCallback(async () => {
    try {
      const response = await axios.get(API.getStarCards(conditions, sort, PAGE_SIZE, page));
      const data = response.data;
      setCards(data);
      setPage(page+1);
      setFetching(false);
      // TODO: hasNext 처리
    } catch (e) {
      // TODO: 예외 처리
      console.log(e);
      setCards([...cards, 1, 2, 3, 4, 5, 6]);
      setPage(page+1);
      setFetching(false);
    }
  }, [cards, conditions, sort, page]);
  
  /**
   * 무대 카드를 가져오는 async function,
   * 1 페이지의 데이터만 가져옴
   * @param newConditions 특정 조건을 Object로 전달하면 해당 조건으로 검색
   * @param newSort 특정 정렬 조건을 String으로 전달하면 해당 정렬 조건으로 검색 
   */
  const fetchDataForStage = useCallback( async (newConditions = {}, newSort = "") => {
    // 특정 조건이나 정렬 조건이 존재하지 않으면 state 로 저장된 조건으로 검색함
    newConditions = newConditions || conditions;
    newSort = newSort || sort;

    try {
      const response = await axios.get(API.getStageCards(newConditions, newSort, PAGE_SIZE, 0));

      const data = response.data;
      setCards(data);
      setPage(1);
    } catch (e) {
      // TODO: 예외 처리
      console.log(e);
      
      setCards([1, 2, 3, 4, 5, 6]);
      setPage(1);
    }
  }, [conditions, sort]);

  /**
   * 무한 스크롤 시 무대 카드를 페이징하여 가져오는 async function,
   * State에 저장된 page 를 참조함
   */
  const fetchDataForStagePaging = useCallback(async () => {
    try {
      const response = await axios.get(API.getStageCards(conditions, sort, PAGE_SIZE, page));
      const data = response.data;
      setCards(data);
      setPage(page+1);
      setFetching(false);
      // TODO: hasNext 처리
    } catch (e) {
      // TODO: 예외 처리
      console.log(e);
      setCards([...cards, 1, 2, 3, 4, 5, 6]);
      setPage(page+1);
      setFetching(false);
    }
  }, [cards, conditions, sort, page]);

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
  }, [isFetching, hasNextPage, target]);

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
                {target === SYMBOL.star ? (
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
                    reviewCount={star_dummy.reviewCount}
                  />
                ) : (
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
                    stageType={stage_dummy.stageType}
                    reviewCount={stage_dummy.reviewCount}
                  />
                )}
                
              </Grid>  
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Search;