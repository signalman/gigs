import { Box, Dialog, DialogTitle, DialogActions, styled, Button, TextField, DialogContent, MenuItem, Select, Typography } from '@mui/material';
import React, { useState, useEffect, useCallback } from 'react';
import ProposalContent from '../Proposal/ProposalContent';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import CategoryItem from '../CategoryItem';
import { posts } from '../../utils/Api'

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

const PostEnroll = () => {
    const [open, setOpen] = useState(false);
    const [writing, setWriting] = useState('');
    const [postDate, setPostDate] = useState(moment().format("YYYY-MM-DD"));
    const [startTime, setStartTime] = useState('00');
    const [endTime, setEndTime] = useState('00');
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState({});
    const [stageItems, setStageItems] = useState('');

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

    const handleOpen = () => {
        setOpen(true);
        console.log("helo")
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSubmit = async () => {
        const data = { date: postDate, endTime: `${endTime}:00:00`, startTime: `${startTime}:00:00`, genre: postGenre }
        // console.log(data)
        const response = await posts(data)
        console.log(response)
    }

    return (
        <>
            <a onClick={handleOpen}>
                포스트 등록
            </a>

            <Dialog fullWidth maxWidth='md' open={open} onClose={handleClose}>
                <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center' }}>포스트 등록</DialogTitle>
                <DialogContent sx={{ fontWeight: 'bold', fontSize: 18 }}>
                    카페 안녕
                </DialogContent>
                <ProposalContent title={'일시'}>
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
                                    read {...params}
                                />}
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
                            {Array.from({ length: 25 }, (v, i) => i < 10 ? `0${i}` : String(i)).map(item => (
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
                            {Array.from({ length: 25 }, (v, i) => i < 10 ? `0${i}` : String(i)).map(item => (
                                <MenuItem key={item} value={item}>{item}</MenuItem>
                            ))}
                        </Select>
                        <Typography sx={{ width: 'auto', textAlign: 'center' }}> 시 </Typography>
                    </Box>
                </ProposalContent>
                <ProposalContent title={'장르'}>
                    <Item>
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
                </ProposalContent>
                {/* <ProposalContent title={'무대소품'}>
                    <Box sx={{ width: 550 }}>
                        <TextField
                            autoFocus
                            fullWidth
                            onChange={(e) => {
                                setStageItems(e.target.value);
                            }}
                        />
                    </Box>
                </ProposalContent>
                <Box sx={{ mb: 2 }} />
                <ProposalContent title={'기타'}>
                    <Box sx={{ width: 550 }}>
                        <TextField
                            autoFocus
                            multiline
                            rows={10}
                            fullWidth
                            onChange={(e) => {
                                setWriting(e.target.value);
                            }}
                        />
                    </Box>
                </ProposalContent> */}
                <DialogActions sx={{ justifyContent: 'center' }}>
                    <Button variant="contained" onClick={handleClose}>닫기</Button>
                    <Button variant="contained"
                        onClick={() => { handleClose(); handleSubmit() }}>
                        제출
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default PostEnroll;