import { Box, Dialog, DialogTitle, DialogActions, styled, Button, TextField, DialogContent, MenuItem, Select, Typography, Alert } from '@mui/material';
import React, { useState, useEffect, useCallback } from 'react';
import ProposalContent from '../../components/Proposal/ProposalContent';
import CategoryItem from '../../components/CategoryItem';
import { posts } from '../../utils/Api'
import MiniProfile from '../MyPage/MiniProfile';
import { to00 } from '../../utils/Constants';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const WritePostDialog = ({
  open,
  onClose,
  host,
  postDate,
}) => {
  const navigate = useNavigate();

  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(1);
  const endTimeList = Array.from({length: 24-startTime}, (v, i) => startTime + i + 1);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');

  const [alert, setAlert] = useState('');

  useEffect(() => {
    setGenres("DANCE, SESSION, ROCK, HIPHOP, INDIE, JAZZ, POP".split(", "));
  }, []);

  const handleStartTimeChange = (e) => {
    const newStartTime = e.target.value;
    if(endTime < newStartTime) setEndTime(newStartTime + 1);
    setStartTime(newStartTime);
  }

  const handleEndTimeChange = (e) => {
      setEndTime(e.target.value);
  }

  const selectGenre = useCallback((genre) => {
      setSelectedGenre(genre);
  }, []);

  // 포스트 작성
  const handleSubmit = useCallback(async () => {
    if(!selectedGenre) {
      setAlert('장르를 선택해주세요!');
      return;
    }

    const data = { date: postDate, endTime: `${to00(endTime)}:00:00`, startTime: `${to00(startTime)}:00:00`, genre: selectedGenre };
    try {
      const response = await posts(data);
      console.log('# 포스트 작성 결과');
      console.log(response);

      handleClose();

      await Swal.fire({
        icon: "success",
        title: "포스트 작성 완료",
        text: "포스트가 성공적으로 작성되었습니다!",
        confirmButtonText: "확인",
      });

      navigate(0);
    } catch(err) {
      console.log(err);   
    }
  }, [postDate, endTime, startTime, selectedGenre]);

  const handleClose = () => {
    setStartTime(0);
    setEndTime(1);
    setSelectedGenre('');
    setAlert('');
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
                <MiniProfile width='200px' name={host.name} repImg={host.repImg} hostId={host.id} />
              </ProposalContent>
              <ProposalContent title={'일시'} width={450}>
                <Box sx={{ display: 'flex', height: '50px', alignItems: 'center' }}>
                  {postDate?.format('YYYY년 MM월 DD일')}
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
                    {endTimeList.map(item => (
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
                    <CategoryItem key={genre} selected={selectedGenre === genre} selectItem={selectGenre}>{genre}</CategoryItem>
                  ))}
                </Box>
              </ProposalContent>
              {alert && <Alert sx={{ mt: '10px', }} severity="error">{alert}</Alert> }
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center' }}>
                <Button variant="contained" onClick={handleClose}>닫기</Button>
                <Button variant="contained"
                    onClick={() => { handleSubmit(); }}>
                    제출
                </Button>
            </DialogActions>
          </>
        )}
    </Dialog>
  );
};

export default WritePostDialog;