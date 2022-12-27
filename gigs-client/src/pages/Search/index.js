// refactor 221102 / 30

import { Box, CircularProgress, Grid, MenuItem, Select } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { COLOR, SYMBOL } from '../../utils/Constants';
import StarSearchConditionBox from '../../components/StarSearchConditionBox';
import StageSearchConditionBox from '../../components/StageSearchConditionBox';
import { fetchHostList, fetchStarList } from '../../utils/Api';
import Card from '../../components/Card';
import counties from '../../utils/Address.json';
import SearchConditionBox from '../../components/SearchCondtionBox';
import styled from '@emotion/styled';

// 카드를 불러올 때, 한 페이지당 몇 개의 카드를 불러올 지 결정하는 변수
// const PAGE_SIZE = Math.ceil(window.innerHeight / 500) * 3;
const PAGE_SIZE = 15;

const debounce = (callback, limit) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback.apply(this, args);
    }, limit);
  }
};

const toStarCard = (data) => {
  return ({
    id: data.starId,
    imgUrl: data.starImgUrl,
    name: data.starName,
    avgScore: data.avgScore,
    reviewCount: data.reviewCount,

    memberNumber: data.memberNumber,
    gender: data.gender,
    showCount: data.showCount,
    genres: data.genres,
    starStageTypes: data.starStageTypes,
  });
};

const toHostCard = (data) => {
  return ({
    id: data.hostId,
    imgUrl: data.imgUrl,
    name: data.name,
    avgScore: data.score,
    reviewCount: data.reviewCount,

    address: data.address,
    stageSize: data.stageSize,
    showCount: data.showCount,
    pay: data.pay,
    stageType: data.stageType,
    targetAge: data.targetAge,
    targetGender: data.targetGender,
    targetMinCount: data.targetMinCount,
  });
};

const Background = styled(Box)((props) => ({
  width: '100%',
  backgroundColor: COLOR.whity,
}));

const Container = styled(Box)((props) => ({
  width: '1200px',
  margin: '0 auto',
  display: 'flex',
  alignContent: 'flex-start',
}));

const SideBox = styled(Box)((props) => ({
  width: '200px',
  backgroundColor: 'white',
}));

const Content = styled(Box)((props) => ({
  width: '1000px',
}));

const Title = styled(Box)((props) => ({
  width: '100%',
  height: '50px',
  color: COLOR.main,
  lineHeight: '50px',
  textIndent: '20px',
  fontSize: '22px',
}));

const SortBox = styled(Box)((props) => ({
  width: '100%',
  height: '50px',
  display: 'flex',
  position: 'relative',
}));

const sortSelectStyle = {
  position: 'absolute',
  right: 15,
  top: 0,
  width: '100px',
  height: '30px',
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
      const response = await fetchStarList(newConditions, newSort, PAGE_SIZE, 0);
      // const response = await axios.get(API.getStarCards(newConditions, newSort, PAGE_SIZE, 0));

      const data = response.data;
      console.log(data);
      setCards(data.content.map(item => toStarCard(item)));
      setPage(1);
      setNextPage(!data.last);
    } catch (e) {
      console.log(e);
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
      setCards([...cards, ...data.content.map(item => toStarCard(item))]);
      setPage(page+1);
      setFetching(false);
      setNextPage(!data.last);
    } catch (e) {
      console.log(e);
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
      const response = await fetchHostList(newConditions, newSort, PAGE_SIZE, 0);

      const data = response.data;
      console.log(data)
      setCards(data.content.map(item => toHostCard(item)));
      setPage(1);
      setNextPage(!data.last);
    } catch (e) {
      console.log(e);
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
      setCards([...cards, ...data.content.map(item => toHostCard(item))]);
      setPage(page+1);
      setFetching(false);
      setNextPage(!data.last);
    } catch (e) {
      console.log(e);
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
  }, [target]);

  // 무한 스크롤 이벤트 등록
  useEffect(() => {
    const handleScroll = debounce(() => {
      const { scrollTop, offsetHeight } = document.documentElement;
      if(window.innerHeight + scrollTop >= offsetHeight - 5) {
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
  }, [isFetching]);

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
    <Background>
      <Container>
        <SideBox>
        {/* <Box sx={{ width: '100%',}}> */}
          <SearchConditionBox isStar={target === SYMBOL.star} />
          {/* {target === SYMBOL.star ?
          (<StarSearchConditionBox target={target} fetchData={fetchDataForStar} setConditions={setConditions} setParentSort={setSort} setProgress={setProgress} />) :
          (<StageSearchConditionBox target={target} fetchData={fetchDataForStage} setConditions={setConditions} setParentSort={setSort} setProgress={setProgress} />)} */}
        {/* </Box> */}

        </SideBox>
        <Content>
          <Title>검색결과</Title>

          <SortBox>
            <Select
              sx={sortSelectStyle}
              variant='standard'
              value={sort}
              onChange={handleSortChange}
            >
              <MenuItem value='dateDesc'>최신순</MenuItem>
              <MenuItem value='rateDesc'>별점순</MenuItem>
              <MenuItem value='reviewDesc'>리뷰순</MenuItem>
            </Select>
          </SortBox>

          <Box sx={{ width: '100%', }}>
            <Grid container spacing={'25px'} rowSpacing={'25px'} sx={{ pl: '25px', mb: '25px' }}>
              {cards?.map((card, i) => (
                <Grid item key={i}>
                  {target === SYMBOL.star ? (
                    <Card target={target} card={card} />
                  ) : (
                    <Card target={target} card={card} />
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
        </Content>
      </Container>
    </Background>
  );
};

export default Search;