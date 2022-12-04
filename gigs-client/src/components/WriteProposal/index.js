import { Box, Dialog, DialogTitle, DialogActions, Button, TextField, DialogContent } from '@mui/material';
import React, { useState, useEffect, useCallback } from 'react';
import MiniProfile from '../../pages/MyPage/MiniProfile';
import ProposalContent from '../Proposal/ProposalContent';

const WriteProposalDialog = ({
  open,
  onClose,
  post,
}) => {
  return (
    <>
      <Dialog open={open} onClose={onClose} >
        {post.err ? (
          <DialogContent sx={{ width: '450px', height: '200px', textAlign: 'center', lineHeight: '200px', overflow: 'hidden' }}>
            {post.err}
          </DialogContent>
        ) : (
          <>
            <DialogTitle sx={{ fontWeight: 'bold' }}>제안서 작성</DialogTitle>
            <DialogContent>
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
              </Box>
            </ProposalContent>
            </DialogContent>
            
            <DialogActions sx={{ justifyContent: 'center' }}>
              <Button variant="contained" onClick={onClose}>닫기</Button>
              <Button variant="contained" onClick={() => {  }}>
                제출
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
};

export default WriteProposalDialog;