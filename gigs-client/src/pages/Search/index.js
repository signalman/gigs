import { Box, Grid } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { API, PATH, SYMBOL } from '../../utils/Constants';
import axios from 'axios';
import StarSearchConditionBox from '../../components/StarSearchConditionBox';
import StageSearchConditionBox from '../../components/StageSearchConditionBox';
import StarCard from '../../components/StarCard';
import StageCard from '../../components/StageCard';

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
  const [StarCardData, setdata] = useState([]);

  useEffect(() => {
    const starCardData = async () => {
      try {
        const result = await axios.get('/stars')
        setdata(result.data.content)
      } catch (error) {
        console.log(error)
      }
    };
    starCardData()
  }, []);

  const [conditions, setConditions] = useState({});
  const [sort, setSort] = useState("dateDesc");
  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(1);
  const [isFetching, setFetching] = useState(false);
  const [hasNextPage, setNextPage] = useState(true);

  const fetchDataForStar = useCallback(async (newConditions = {}, newSort = "") => {
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
      setPage(page + 1);
      setFetching(false);
      // TODO: hasNext 처리
    } catch (e) {
      console.log(e);
      setCards([...cards, 1, 2, 3, 4, 5, 6]);
      setPage(page + 1);
      setFetching(false);
    }
  }, [cards, conditions, sort, page]);

  const fetchDataForStage = useCallback(async (newConditions = {}, newSort = "") => {
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
      setPage(page + 1);
      setFetching(false);
      // TODO: hasNext 처리
    } catch (e) {
      console.log(e);
      setCards([...cards, 1, 2, 3, 4, 5, 6]);
      setPage(page + 1);
      setFetching(false);
    }
  }, [cards, conditions, sort, page]);

  const star_dummy = {
    starId: 1,
    starName: "Oasis",
    avgScore: 2,
    address: {
      addressName: "수원시",
      cityName: "장안구",
      countryName: "율전동"
    },
    memberNumber: 3,
    gender: "남성",
    showCount: 5,
    starImgUrl: "img/star_tmp.jpg",
    starGenres: [
      { starGenreId: 1, genreName: "팝송" },
      { starGenreId: 2, genreName: "발라드" }],
    starStageTypes: [
      { starStageTypeId: 1, stageTypeName: "카페" },
      { starStageTypeId: 2, stageTypeName: "길거리" }]
  }

  const stage_dummy = {
    hostId: 1,
    stageName: "스타벅스",
    avgScore: 2,
    stageAddress: "경기도 수원시 영통구",
    stageSize: 34,
    age: 20,
    //gender:"남성",
    stageStartTime: "10:00",
    stageEndTime: "22:00",
    showCount: 5,
    stageCost: 10,
    stageImgUrl: "img/stage_tmp.jpg",
    stageGenres: [
      { stageGenreId: 1, genreName: "팝송" },
      { stageGenreId: 2, genreName: "발라드" },
      { stageGenreId: 3, genreName: "랩" }],
    stageTypes: [
      { stageTypeId: 1, genreName: "카페" },
      { stageTypeId: 2, genreName: "식당" }
    ]
  }

  useEffect(() => {
  }, []);

  useEffect(() => {
    switch (target) {
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
      if (window.innerHeight + scrollTop >= offsetHeight) {
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
    if (isFetching && hasNextPage) {
      switch (target) {
        case SYMBOL.star:
          fetchDataForStarPaging();
          break;
        case SYMBOL.stage:
          fetchDataForStagePaging();
      }
    } else if (!hasNextPage) setFetching(false);
  }, [isFetching, target]);

  return (
    <>
      <Box
        sx={{
          width: `100%`,
        }}
      >
        <Box
          sx={{ width: '100%', }}>
          {target === SYMBOL.star ?
            (<StarSearchConditionBox target={target} fetchData={fetchDataForStar} setConditions={setConditions} setParentSort={setSort} />) :
            (<StageSearchConditionBox target={target} fetchData={fetchDataForStage} setConditions={setConditions} setParentSort={setSort} />)}
        </Box>
        <Box
          sx={{
            width: '100%',
          }}
        >
          <Grid container spacing={'75px'} sx={{ pl: '75px', }}>
            {StarCardData?.map((card, i) => (
              <Grid item key={i}>
                <StarCard
                  starId={card.starId}
                  starName={card.starName}
                  avgScore={card.avgScore}
                  starAddress={card.address}
                  memberNumber={card.memberNumber}
                  gender={card.gender}
                  showCount={card.showCount}
                  starGenres={card.starGenres}
                  starStageTypes={card.starStageTypes}
                  starImgUrl={card.starImgUrl}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
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