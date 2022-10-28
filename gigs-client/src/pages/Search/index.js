import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { API } from '../../utils/Constants';
import axios from 'axios';
import SearchConditionBox from '../../components/SearchConditionBox';
import StarCard from '../../components/StarCard';
import StageCard from '../../components/StageCard';

const Search = () => {
  const [starCards, setStarCards] = useState([]);

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
    // TODO: API 개발 시 open
    // const getStarCards = async () => {
    //   const response = await axios.get(API.getStarCards('', [], [], '', '', 'dateDesc'));

    //   return response.data;
    // }
    
    // const data = getStarCards();
    // setStarCards(data);
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
          <SearchConditionBox setStarCards={setStarCards} />
        </Box>
        <Box
          sx={{
            width: '100%',
          }}
        >

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