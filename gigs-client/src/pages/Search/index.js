// refactor 221102

import { Box, CircularProgress, Grid, MenuItem, Select } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { DEV, SYMBOL } from '../../utils/Constants';
import StarSearchConditionBox from '../../components/StarSearchConditionBox';
import StageSearchConditionBox from '../../components/StageSearchConditionBox';
import StarCard from '../../components/StarCard';
import StageCard from '../../components/StageCard';
import { fetchHostList, fetchStarList } from '../../utils/Api';

// 카드를 불러올 때, 한 페이지당 몇 개의 카드를 불러올 지 결정하는 변수
const PAGE_SIZE = Math.ceil(window.innerHeight / 500) * 3;

const starDummy = (() => {
  let id = 0;
  return () => ({
    starId: id++,
    starName: "Oasis",
    avgScore: 2.4,
    address: "경기도 수원시 영통구",
    memberNumber: 3,
    gender: "남성",
    showCount: id,
    starImgUrl: "img/star_tmp.jpg",
    genres:[
      {starGenreId : 1, genreName : "팝송"},
      {starGenreId : 2, genreName : "발라드"}
    ],
    starStageTypes:[
      {starStageTypeId: 1, stageTypeName : "카페"},
      {starStageTypeId : 2, stageTypeName : "길거리"}
    ],
    reviewCount: 15,
  });
})();

const stageDummy = (() => {
  let id = 0;
  return () => ({
    hostId: id++,
    stageName: "스타벅스",
    avgScore: 4.1,
    address: {
      addressName: "경기도",
      cityName: "수원시",
      countryName: "영통구",
    },
    stageSize: 34,
    targetAge: 20,
    targetGender: "WOMEN",
    targetMinCount: 40,
    startTime: "10:00",
    endTime: "22:00",
    showCount: id,
    pay: 10,
    stageImgUrl: "img/stage_tmp.jpg",
    genres:[
      {stageGenreId : 1, genreName : "팝송"},
      {stageGenreId : 2, genreName : "발라드"},
      {stageGenreId : 3, genreName : "랩"}],
    stageType: "카페",
    reviewCount: 10,
  });
})();

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
  // progress
  const [isProgress, setProgress] = useState(false);

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
      const response = await fetchStarList(newConditions, newSort, 15, 0);
      // const response = await axios.get(API.getStarCards(newConditions, newSort, PAGE_SIZE, 0));

      const data = response.data;
      console.log(data);
      setCards(data.content);
      setPage(1);
      setNextPage(!data.last);
    } catch (e) {
      if(DEV) {
        setCards([starDummy(), starDummy(), starDummy(), starDummy(), starDummy(), starDummy(),]);
        setPage(1);
        setNextPage(true);
      } else {
        // TODO: 예외 처리
      }
    } finally {
      setProgress(false);
    }
  }, [conditions, sort]);

  /**
   * 무한 스크롤 시 스타 카드를 페이징하여 가져오는 async function,
   * State에 저장된 page 를 참조함
   */
  const fetchDataForStarPaging = useCallback(async () => {
    try {
      const response = await fetchStarList(conditions, sort, PAGE_SIZE, page);

      const data = response.data;
      setCards([...cards, ...data.content]);
      setPage(page+1);
      setFetching(false);
      setNextPage(!data.last);
    } catch (e) {
      if(DEV) {
        setCards([...cards, starDummy(), starDummy(), starDummy(), starDummy(), starDummy(), starDummy(),]);
        setPage(page+1);
        setFetching(false);
        setNextPage(true);
      } else {
        // TODO: 예외 처리
      }
    } finally {
      setProgress(false);
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
      const response = await fetchHostList(newConditions, newSort, 15, 0);

      const data = response.data;
      console.log(data)
      setCards(data.content);
      setPage(1);
      setNextPage(!data.last);
    } catch (e) {
      if(DEV) {
        setCards([stageDummy(), stageDummy(), stageDummy(), stageDummy(), stageDummy(), stageDummy(),]);
        setPage(1);
        setNextPage(true);
      } else {
        // TODO: 예외 처리
      }
    } finally {
      setProgress(false);
    }
  }, [conditions, sort]);

  /**
   * 무한 스크롤 시 무대 카드를 페이징하여 가져오는 async function,
   * State에 저장된 page 를 참조함
   */
  const fetchDataForStagePaging = useCallback(async () => {
    try {
      const response = await fetchHostList(conditions, sort, PAGE_SIZE, page);

      const data = response.data;
      setCards([...cards, ...data.content]);
      setPage(page+1);
      setFetching(false);
      setNextPage(!data.last);
    } catch (e) {
      if(DEV) {
        setCards([...cards, stageDummy(), stageDummy(), stageDummy(), stageDummy(), stageDummy(), stageDummy(),]);
        setPage(page+1);
        setFetching(false);
        setNextPage(true);
      } else {
        // TODO: 예외 처리
      }
    } finally {
      setProgress(false);
    }
  }, [cards, conditions, sort, page]);

  // 찾으려는 대상이 바뀌면 데이터를 다시 가져옴
  useEffect(() => {
    // set Progress
    setProgress(true);

    switch(target) {
      case SYMBOL.star:
        fetchDataForStar();
        break;
      case SYMBOL.stage:
        fetchDataForStage();
        break;
      default:
    }
  }, [target, fetchDataForStar, fetchDataForStage]);

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
      // set Progress
      setProgress(true);

      switch(target) {
        case SYMBOL.star:
          fetchDataForStarPaging();
          break;
        case SYMBOL.stage:
          fetchDataForStagePaging();
          break;
        default:
      }
    } else if(!hasNextPage) setFetching(false);
  }, [isFetching, hasNextPage, fetchDataForStarPaging, fetchDataForStagePaging, target]);

  // 정렬 변경 시
  const handleSortChange = useCallback((e) => {
    const newSort = e.target.value;
    setSort(newSort);

    // set Progress
    setProgress(true);

    switch(target) {
      case SYMBOL.star:
        fetchDataForStar(conditions, newSort);
        break;
      case SYMBOL.stage:
        fetchDataForStage(conditions, newSort);
        break;
      default:
    }

  }, [target, conditions, fetchDataForStar, fetchDataForStage]);

  return (
    <Box
      sx={{
        width: `1200px`,
        m: '0 auto',
      }}
    >
      <Box
        sx={{ width: '100%', my: `25px`}}>
        {target === SYMBOL.star ?
        (<StarSearchConditionBox target={target} fetchData={fetchDataForStar} setConditions={setConditions} setParentSort={setSort} setProgress={setProgress} />) :
        (<StageSearchConditionBox target={target} fetchData={fetchDataForStage} setConditions={setConditions} setParentSort={setSort} setProgress={setProgress} />)}
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
        <Grid container spacing={'75px'} rowSpacing={'25px'} sx={{ pl: '75px', mb: '25px' }}>
          {cards?.map((card, i) => (
            <Grid item key={i}>
              {target === SYMBOL.star ? (
                <StarCard
                  starId={card.starId}
                  starName={card.starName}
                  avgScore={card.avgScore}
                  address={card.address}
                  memberNumber={card.memberNumber}
                  gender={card.gender}
                  showCount={card.showCount}
                  genres={card.genres}
                  starStageTypes={card.starStageTypes}
                  starImgUrl={card.starImgUrl}
                  reviewCount={card.reviewCount}
                />
              ) : (
                <StageCard
                  cardData={card}
                />
              )}
            </Grid>  
          ))}
        </Grid>
        {isProgress ? (
          <Box sx={{ width: '100%', height: '75px', display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        ) : (<></>)}
      </Box>
    </Box>
  );
};

export default Search;