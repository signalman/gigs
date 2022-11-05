import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, Slider, styled, Switch, TextField, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import CategoryItem from '../CategoryItem';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import moment from 'moment';

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
  alignItems: 'center',
}));

const ItemName = styled(Box)(() => ({
  width: '100px',
  height: '100%',
  lineHeight: '50px',
  textAlign: 'center',
  fontSize: 17,
}));

const sliderValues = [
  {
    value: 0,
    label: '00시',
  },
  {
    value: 6,
    label: '06시',
  },
  {
    value: 12,
    label: '12시',
  },
  {
    value: 18,
    label: '18시',
  },
  {
    value: 24,
    label: '24시',
  },
];

const StageSearchConditionBox = ({
  fetchData,
  setConditions,
  setParentSort,
}) => {
  const [genres, setGenres] = useState([]);
  const [stageTypes, setStageTypes] = useState([]);

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [selectedGenres, setSelectedGenres] = useState({});
  const [selectedStageTypes, setSelectedStageTypes] = useState({});

  // 무대 찾기
  const [targetAge, setTargetAge] = useState("all");
  const [targetGender, setTargetGender] = useState("MIXED");
  const [targetMinCount, setTargetMinCount] = useState(0);
  const [isTimeSearch, setTimeSearch] = useState(false);
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());
  const [time, setTime] = useState([0, 24]);
  const [startTime, setStartTime] = useState(moment());
  const [endTime, setEndTime] = useState(moment());
  const [timeDialogOpen, setTimeDialogOpen] = useState(false);

  // DB에서 모든 장르와 장소 종류를 가져옴
  useEffect(() => {
    // 임시 코드
    // TODO: 불변 테이블에서 가져오기?
    setGenres("DANCE, SESSION, ROCK, HIPHOP, INDIE, JAZZ, POP".split(", "));
    setStageTypes("CAFE, BAR, RESTAURANT, SCHOOL".split(", "));
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

  // 관객 나이대 변경 시
  const handleTargetAgeChange = useCallback((e) => {
    setTargetAge(e.target.value);
  });

  // 관객 성별 변경 시
  const handleTargetGenderChange = useCallback((e) => {
    setTargetGender(e.target.value);
  });

  // 관객 최소 수 변경 시
  const handleTargetMinCountChange = useCallback((e) => {
    const count = Number(e.target.value); 
    setTargetMinCount(count < 0 ? 0 : count);
  });

  // 날짜/시간 조건 선택 여부
  const handleIsTimeSearchChange = (e) => {
    setTimeSearch(e.target.checked);
  }

  // 시작 날짜 변경 시
  const handleStartDateChange = (e) => {
    setStartDate(e);
  }

  // 종료 날짜 변경 시
  const handleEndDateChange = (e) => {
    setEndDate(e);
  }

  // 시작 시간 변경 시
  const handleStartTimeChange = (e) => {
    setStartTime(e);
  }

  // 종료 시간 변경 시
  const handleEndTimeChange = (e) => {
    setEndTime(e);
  }

  // 시간 변경 시
  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  // 시간 클릭해서 다이얼로그 열 때
  const handleTimeClick = () => {
    setTimeDialogOpen(true);
  };

  // 시간 변경 다이얼로그 닫을 때
  const handleTimeDialogClose = () => {
    setTimeDialogOpen(false);
  };

  // 검색 버튼 클릭 시
  const handleClickSearchBtn = useCallback(() => {
    const stageTypes = [];
    for(const key in selectedStageTypes) {
      if(selectedStageTypes[key]) stageTypes.push(key);
    }

    const genres = [];
    for(const key in selectedGenres) {
      if(selectedGenres[key]) genres.push(key);
    }

    let times = {};
    if(isTimeSearch) {
      times = {
        startDate: startDate.format("YYYY-MM-DD"),
        endDate: endDate.format("YYYY-MM-DD"),
        startTime: `${time[0] < 10 ? `0${time[0]}` : time[0]}:00:00`,
        endTime: `${time[1] < 10 ? `0${time[1]}` : time[1]}:00:00`, 
        // startTime: startTime.format("HH:mm:ss"),
        // endTime: endTime.format("HH:mm:ss"),
      };
    }

    const newConditions = {
      name, address, genres, stageTypes,
      targetAge: targetAge === "all" ? "" : targetAge,
      targetGender: targetGender === "MIXED" ? "" : targetGender,
      targetMinCount,
      ...times
    };
    setConditions(newConditions);
    fetchData(newConditions);
  }, [name, selectedStageTypes, selectedGenres, address, targetAge, targetGender, targetMinCount, isTimeSearch, startDate, endDate, startTime, endTime, setConditions, fetchData]);

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
              <ItemName>무대 이름</ItemName>
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
              <ItemName>선호 장르</ItemName>
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
              <ItemName>관객</ItemName>
              <Select
                sx={{
                  width: '100px',
                  height: '30px',
                }}
                variant='standard'
                value={targetAge}
                onChange={handleTargetAgeChange}
              >
                <MenuItem value='all'>-</MenuItem>
                <MenuItem value='10'>10대</MenuItem>
                <MenuItem value='20'>20대</MenuItem>
                <MenuItem value='30'>30대</MenuItem>
                <MenuItem value='40'>40대</MenuItem>
                <MenuItem value='50'>50대</MenuItem>
                <MenuItem value='60'>60대 이상</MenuItem>
              </Select>
              <Select
                sx={{
                  width: '100px',
                  height: '30px',
                  ml: `20px`,
                }}
                variant='standard'
                value={targetGender}
                onChange={handleTargetGenderChange}
              >
                <MenuItem value='MIXED'>모두</MenuItem>
                <MenuItem value='MEN'>남성</MenuItem>
                <MenuItem value='WOMEN'>여성</MenuItem>
              </Select>
              <TextField
                sx={{
                  width: '50px',
                  height: '30px',
                  alignSelf: 'center',
                  ml: `20px`,
                }}
                type='number'
                variant='standard'
                value={targetMinCount}
                onChange={handleTargetMinCountChange}
              ></TextField>
              <Typography>
                명 이상
              </Typography>
            </Item>
          </Line>
          <Line>
            <Item>
              <ItemName>시간</ItemName>
              <Switch checked={isTimeSearch} onChange={handleIsTimeSearchChange} />
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  renderInput={(props) => <TextField size='small' sx={{ width: '120px' }} variant='standard' disabled {...props} />}
                  label="From"
                  value={startDate}
                  onChange={handleStartDateChange}
                  disabled={!isTimeSearch}
                />
                <Typography sx={{ width: '30px', textAlign: 'center' }}>~</Typography>
                <DatePicker
                  renderInput={(props) => <TextField size='small' sx={{ width: '120px' }} variant='standard' disabled {...props} />}
                  label="To"
                  value={endDate}
                  onChange={handleEndDateChange}
                  disabled={!isTimeSearch}
                />
                <Box sx={{ width: '30px' }} />
                <TextField
                  sx={{ width: '100px', alignSelf: 'end', mb: '3px', }}
                  onClick={handleTimeClick}
                  contentEditable={false}
                  size='small'
                  variant="standard"
                  value={`${time[0]} ~ ${time[1]} 시`}
                  disabled={!isTimeSearch}
                />
                {/* <TimePicker
                  renderInput={(props) => <TextField size='small' sx={{ width: '120px' }} variant='standard' disabled {...props} />}
                  label="From"
                  ampm={false}
                  value={startTime}
                  onChange={handleStartTimeChange}
                  disabled={!isTimeSearch}
                />
                <Typography sx={{ width: '30px', textAlign: 'center' }}>~</Typography>
                <TimePicker
                  renderInput={(props) => <TextField size='small' sx={{ width: '120px' }} variant='standard' disabled {...props} />}
                  label="To"
                  ampm={false}
                  value={endTime}
                  onChange={handleEndTimeChange}
                  disabled={!isTimeSearch}
                /> */}
              </LocalizationProvider>
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
      </Box>
      <Dialog
        open={timeDialogOpen}
        onClose={handleTimeDialogClose}
      >
        <DialogTitle>시간 선택</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: '50px', pb: '10px' }}>
            <Slider
              sx={{ width: '300px', }}
              max={24}
              step={1}
              marks={sliderValues}
              value={time}
              onChange={handleTimeChange}
              valueLabelDisplay='on'
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' onClick={handleTimeDialogClose}>저장</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default StageSearchConditionBox;