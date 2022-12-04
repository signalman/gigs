import { Box, Dialog, DialogTitle, DialogActions, Button, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import MiniProfile from '../../pages/MyPage/MiniProfile';
import ProposalContent from '../Proposal/ProposalContent';

const WriteProposal = () => {
    const [open, setOpen] = useState(false);
    const [writing,setWriting] = useState("");

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSubmit = () => {

    }

    return (
        <>
            <Button varitant="contained" onClick={handleOpen}>
                제안서 작성
            </Button>
            <Dialog fullWidth open={open} onClose={handleClose}>
                <DialogTitle sx={{ fontWeight: 'bold' }}>제안서 작성</DialogTitle>
                <ProposalContent title={'스타'}>
                    <MiniProfile />
                </ProposalContent>
                <ProposalContent title={'일시'}>
                    <Box sx={{ width: '100%', height: '50px', lineHeight: '50px', }}>
                        2022/11/17 10:00~12:00
                    </Box>
                </ProposalContent>
                <ProposalContent title={'기타'}>
                    <Box sx={{ width: 450 }}>
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
                </ProposalContent>
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

export default WriteProposal;