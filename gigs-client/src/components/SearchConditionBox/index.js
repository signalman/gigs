import { Box, Button, FormControl, FormControlLabel, MenuItem, Radio, RadioGroup, Select, styled, TextField } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import CategoryItem from '../CategoryItem';
import { API } from '../../utils/Constants';
import axios from 'axios';

const Line = styled(Box)(() => ({
  width: '100%',
  height: '50px',
  display: 'flex',
  position: 'relative',
}));

const Item = styled(Box)((p) => ({
  width: p.type === 'half' ? '50%' : '100%',
  height: '100%',
  display: 'flex',
}));

const ItemName = styled(Box)(() => ({
  width: '100px',
  height: '100%',
  lineHeight: '50px',
  textAlign: 'center',
  fontSize: 17,
}));

const SearchConditionBox = ({
  setStarCards,
}) => {
  const [genres, setGenres] = useState([]);
  const [stageTypes, setStageTypes] = useState([]);

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [selectedGenres, setSelectedGenres] = useState({});
  const [selectedStageTypes, setSelectedStageTypes] = useState({});
  const [teamMember, setTeamMember] = useState('none');

  // DB에서 모든 장르와 장소 종류를 가져옴
  useEffect(() => {
    // 임시 코드
    setGenres(['Rock', '힙합', '재즈']);
    setStageTypes(['Cafe', 'Pub', 'Stage']);
  }, []);

  // 장르를 성공적으로 가져오면 선택한 장르 리스트 초기화
  useEffect(() => {
    const newSelectedGenres = {};
    for(const genre of genres) {
      newSelectedGenres[genre] = false;
    }
    setSelectedGenres(newSelectedGenres);
  }, [genres]);

  // 무대 종류를 성공적으로 가져오면 선택한 무대 종류 리스트 초기화
  useEffect(() => {
    const newSelectedStageTypes = {};
    for(const stageType of stageTypes) {
      newSelectedStageTypes[stageType] = false;
    }
    setSelectedGenres(newSelectedStageTypes);
  }, [stageTypes]);

  // 이름 변경 시
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  // 주소 변경 시
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  // 장르 아이템 선택하면 장르 선택 표시
  const selectGenre = useCallback((genre) => {
    setSelectedGenres({...selectedGenres, [genre]: !selectedGenres[genre]});
  }, [selectedGenres]);

  // 무대 종류 아이템 선택하면 무대 종류 선택 표시
  const selectStageType = useCallback((stageType) => {
    setSelectedStageTypes({...selectedStageTypes, [stageType]: !selectedStageTypes[stageType]});
  }, [selectedStageTypes]);

  // 팀 구성 변경 시
  const handleTeamMemberChange = (e) => {
    console.log(e);
    setTeamMember(e.target.value);
  }

  // 검색 버튼 클릭 시
  const handleClickSearchBtn = useCallback(() => {
    const getStarCardsApi = async () => {
      const finalStageTypes = [];
      for(const key in selectedStageTypes) {
        if(selectedStageTypes[key]) finalStageTypes.push(key);
      }

      const finalGenres = [];
      for(const key in selectedGenres) {
        if(selectedGenres[key]) finalGenres.push(key);
      }

      const response = await axios.get(API.getStarCards(name, finalStageTypes, finalGenres, address, teamMember, 'dateDesc'));

      return response.data;
    }
    setStarCards(getStarCardsApi());
  }, [name, selectedStageTypes, selectedGenres, address, teamMember, setStarCards]);

  return (
    <>
      <Box
        sx={{
          width: `1150px`,
          m: '0 auto',
          mt: '50px',
        }}
      >
        <Box
          sx={{
            width: `100%`,
            border: '1px solid #808080',
            boxShadow: '0 2px 4px #404040',
          }}
        >
          <Line>
            <Item>
              <ItemName>스타 이름</ItemName>
              <TextField
                sx={{
                  width: '200px',
                  height: '30px',
                  alignSelf: 'center',
                }}
                variant='standard'
                value={name}
                onChange={handleNameChange}
              ></TextField>
            </Item>
          </Line>
          <Line>
            <Item>
              <ItemName>장르</ItemName>
              <Box
                sx={{
                  width: 'auto',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {genres.map(genre => (
                  <CategoryItem key={genre} selected={selectedGenres[genre]} selectItem={selectGenre}>{genre}</CategoryItem>
                ))}
              </Box>
            </Item>
          </Line>
          <Line>
            <Item>
              <ItemName>무대 종류</ItemName>
              <Box
                sx={{
                  width: 'auto',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {stageTypes.map(stageType => (
                  <CategoryItem key={stageType} selected={selectedStageTypes[stageType]} selectItem={selectStageType}>{stageType}</CategoryItem>
                ))}
              </Box>
            </Item>
          </Line>
          <Line>
            <Item type='half'>
              <ItemName>주소</ItemName>
              <TextField
                sx={{
                  width: '200px',
                  height: '30px',
                  alignSelf: 'center',
                }}
                variant='standard'
                value={address}
                onChange={handleAddressChange}
              ></TextField>
            </Item>
            <Item type='half'>
              <ItemName>팀 구성</ItemName>
              <FormControl sx={{ alignSelf: 'center' }}>
                <RadioGroup
                  row
                  value={teamMember}
                  onChange={handleTeamMemberChange}
                >
                  <FormControlLabel value='none' control={<Radio size='small' />} label='무관' />
                  <FormControlLabel value='man' control={<Radio size='small' />} label='남성' />
                  <FormControlLabel value='woman' control={<Radio size='small' />} label='여성' />
                </RadioGroup>
              </FormControl>
            </Item>
          </Line>
          <Line>
            <Button
              sx={{
                position: 'absolute',
                top: 0,
                right: 15,
                width: 100,
                height: 35,
                alignSelf: 'center',
                backgroundColor: '#D046D2',
                borderRadius: 3,
              }}
              variant='contained'
              onClick={handleClickSearchBtn}
            >
              검색
            </Button>
          </Line>
        </Box>

        <Line sx={{ mt: '50px', }}>
          <Select
            sx={{
              position: 'absolute',
              right: 15,
              top: 0,
              width: '100px',
              height: '30px',
            }}
            variant='standard'
            defaultValue='최신순'
          >
            <MenuItem value='최신순'>최신순</MenuItem>
          </Select>
        </Line>
      </Box>
    </>
  );
};

export default SearchConditionBox;