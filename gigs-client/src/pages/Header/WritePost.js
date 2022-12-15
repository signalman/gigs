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
import { to00 } from '../../utils/Constants';
import Swal from 'sweetalert2';

const WritePost = ({
  open,
  onClose,
  host,
}) => {
  const [postDate, setPostDate] = useState(moment());
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(1);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState({});

  const [postGenre, setPostGenre] = useState('');

  useEffect(() => {
    setGenres("DANCE, SESSION, ROCK, HIPHOP, INDIE, JAZZ, POP".split(", "));
  }, []);

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

  // 포스트 작성
  const handleSubmit = async () => {
    const data = { date: postDate, endTime: `${to00(endTime)}:00:00`, startTime: `${to00(startTime)}:00:00`, genre: postGenre };
    try {
      const response = await posts(data);
      console.log('# 포스트 작성 결과');
      console.log(response);

      await Swal.fire({
        icon: "success",
        title: "포스트 작성 완료",
        text: "포스트가 성공적으로 작성되었습니다!",
        confirmButtonText: "확인",
      });
    } catch(err) {
      console.log(err);   
    }
  };

  const handleClose = () => {
    setPostDate(null);
    onClose();
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      {host.err ? (
          <DialogContent sx={{ width: '450px', height: '200px', textAlign: 'center', lineHeight: '200px', overflow: 'hidden' }}>
            {host.err}
          </DialogContent>
        ) : (
          <>
            <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center' }}>포스트 등록</DialogTitle>
            <DialogContent>
              <ProposalContent title={'무대'} width={200} >
                <MiniProfile width='200px' name={host.name} repImg={host.repImg} />
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
                    <Select
                      sx={{
                        width: '50px',
                        height: '30px',
                        ml: `20px`,
                      }}
                      variant='standard'
                      value={startTime}
                      onChange={handleStartTimeChange}
                    >
                      {Array.from({length: 24}, (v, i) => i).map(item => (
                        <MenuItem key={item} value={item}>{item}</MenuItem>
                      ))}
                    </Select>
                    <Typography sx={{ width: 'auto', textAlign: 'center' }}> 시 ~ </Typography>
                    <Select
                      sx={{
                        width: '50px',
                        height: '30px',
                        ml: `20px`,
                      }}
                      variant='standard'
                      value={endTime}
                      onChange={handleEndTimeChange}
                    >
                      {Array.from({length: 24}, (v, i) => i+1).map(item => (
                        <MenuItem key={item} value={item}>{item}</MenuItem>
                      ))}
                    </Select>
                    <Typography sx={{ width: 'auto', textAlign: 'center' }}> 시 </Typography>
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
                    onClick={() => { handleSubmit(); handleClose(); }}>
                    제출
                </Button>
            </DialogActions>
          </>
        )}
    </Dialog>
  );
};

export default WritePost;