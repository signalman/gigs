import { Box, Dialog, DialogTitle, DialogActions, styled, Button, TextField, DialogContent, MenuItem, Select, Typography } from '@mui/material';
import React, { useState, useEffect, useCallback } from 'react';
import ProposalContent from '../../components/Proposal/ProposalContent';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import CategoryItem from '../../components/CategoryItem';
import { posts } from '../../utils/Api'
import MiniProfile from '../MyPage/MiniProfile';

const Item = styled(Box)((p) => ({
  width: p.type === 'half' ? '50%' : '100%',
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

const WritePost = ({
  open,
  onClose,
  host,
}) => {
  const [writing, setWriting] = useState('');
  const [availableTimes, setAvailableTimes] = useState({});
  const [startTimeList, setStartTimeList] = useState([]);
  const [endTimeList, setEndTimeList] = useState([]);
  const [postDate, setPostDate] = useState(null);
  const [startTime, setStartTime] = useState(undefined);
  const [endTime, setEndTime] = useState(undefined);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState({});
  const [stageItems, setStageItems] = useState('');

  const [postGenre, setPostGenre] = useState('');

  useEffect(() => {
    setGenres("DANCE, SESSION, ROCK, HIPHOP, INDIE, JAZZ, POP".split(", "));
  }, []);

  // Host 정보가 바뀌면 포스트 작성 가능한 시간이 바뀜
  useEffect(() => {
    if(Object.keys(host).length === 0) return;
    console.log('host changed');

    const newAvailableTimes = {};
    host.posts?.forEach(post => {
      const startTime = Number(moment(post.startTime).format("HH"));
      const endTime = Number(moment(post.endTime).format("HH"));
      console.log(startTime);
      console.log(endTime);

      if(!newAvailableTimes[post.date]) newAvailableTimes[post.date] = Array.from({length: 25}, (v, i) => true);
      for(let t=startTime+1; t<endTime; t++) {
        newAvailableTimes[post.date][t] = false;
      }
      console.log(newAvailableTimes[post.date]);
    })

    setAvailableTimes(newAvailableTimes);
    setPostDate(moment().format('YYYY-MM-DD'));
  }, [host]);

  // 날짜를 선택하면 포스트를 작성할 수 있는 시간으로 select 값이 변경됨
  useEffect(() => {
    if(!postDate) return;
    if(!availableTimes[postDate]) {
      setStartTimeList(Array.from({length: 24}, (v, i) => i < 10 ? `0${i}` : String(i)));

      setStartTime('00');
    } else {
      const newStartTimeList = [];
      for(let s=0; s<24; s++) {
        if(!availableTimes[postDate][s] || !availableTimes[postDate][s+1]) {
          continue;
        }
        newStartTimeList.push(s < 10 ? `0${s}` : String(s));
      }

      setStartTimeList(newStartTimeList);
      setStartTime(newStartTimeList[0]);
    }
  }, [postDate]);

  // 시작 시간을 선택하면 끝 시간 select 리스트가 변경됨
  useEffect(() => {
    if(!postDate) return;
    let e = Number(startTime) + 1;

    const newEndTimeList = [];
    for(; e<=24; e++) {
      if(!availableTimes[postDate] || (availableTimes[postDate] && availableTimes[postDate][e])) {
        newEndTimeList.push(e < 10 ? `0${e}` : String(e));
      } else {
        break;
      }
    }

    setEndTimeList(newEndTimeList);
    setEndTime(newEndTimeList[0]);
  }, [startTime]);

  const handleStartTimeChange = (e) => {
      setStartTime(e.target.value);
  }

  const handleEndTimeChange = (e) => {
      setEndTime(e.target.value);
  }

  const selectGenre = useCallback((genre) => {
      setSelectedGenres({ [genre]: !selectedGenres[genre] });
      if (!selectedGenres[genre] === true) {
          setPostGenre(genre)
      }
  }, [selectedGenres]);

  const handleSubmit = async () => {
      const data = { date: postDate, endTime: `${endTime}:00:00`, startTime: `${startTime}:00:00`, genre: postGenre }
      // console.log(data)
      const response = await posts(data)
      console.log(response)
  }

  const handleClose = () => {
    setPostDate(null);
    onClose();
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center' }}>포스트 등록</DialogTitle>
      <DialogContent>
        <ProposalContent title={'무대'} width={200} >
          <MiniProfile width='200px' name={host.hostName} repImg={host.repImg} />
        </ProposalContent>
        <ProposalContent title={'일시'} width={450}>
          <Box sx={{ display: 'flex', width: '450px', alignItems: 'center' }}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                value={postDate}
                onChange={(e) => {
                  setPostDate(e.format("YYYY-MM-DD"))
                }}
                renderInput={(params) => <TextField
                  InputProps={{
                    readOnly: true,
                  }}
                  {...params}
                  />
                }
              />
            </LocalizationProvider>
            {postDate && startTimeList.length > 0 ? (
              <>
                <Select
                  sx={{
                    width: '50px',
                    height: '30px',
                    ml: `20px`,
                  }}
                  variant='standard'
                  value={startTime}
                  disabled={!postDate || startTimeList.length === 0}
                  onChange={handleStartTimeChange}
                >
                  {startTimeList.map(item => (
                    <MenuItem key={item} value={item}>{item}</MenuItem>
                  ))}
                </Select>
                <Typography sx={{ width: 'auto', textAlign: 'center' }}> 시 ~ </Typography>
              </>
            ) : (<></>)}
            {postDate && startTimeList.length > 0 && endTimeList.length > 0 ? (
              <>
                <Select
                  sx={{
                    width: '50px',
                    height: '30px',
                    ml: `20px`,
                  }}
                  variant='standard'
                  value={endTime}
                  disabled={!postDate || endTimeList.length === 0}
                  onChange={handleEndTimeChange}
                >
                  {endTimeList.map(item => (
                    <MenuItem key={item} value={item}>{item}</MenuItem>
                  ))}
                </Select>
                <Typography sx={{ width: 'auto', textAlign: 'center' }}> 시 </Typography>
              </>
            ) : (<></>)}
          </Box>
        </ProposalContent>
        <ProposalContent title={'장르'} width={450}>
          <Box
            sx={{
              width: '450px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '5px',
              paddingTop: '15px'
            }}
          >
            {genres.map(genre => (
              <CategoryItem key={genre} selected={selectedGenres[genre]} selectItem={selectGenre}>{genre}</CategoryItem>
            ))}
          </Box>
        </ProposalContent>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
          <Button variant="contained" onClick={handleClose}>닫기</Button>
          <Button variant="contained"
              onClick={() => { handleClose(); handleSubmit() }}>
              제출
          </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WritePost;