import { Box, Dialog, DialogTitle, DialogActions, Button, TextField, DialogContent } from '@mui/material';
import React, { useState, useEffect, useCallback } from 'react';
import MiniProfile from '../../pages/MyPage/MiniProfile';
import { createProposal } from '../../utils/Api';
import ProposalContent from '../Proposal/ProposalContent';
import {useNavigate} from 'react-router-dom';

const WriteProposalDialog = ({
  open,
  onClose,
  post,
}) => {
  const navigate = useNavigate();

  const [desc, setDesc] = useState('');

  const onSubmit = useCallback(async () => {
    const proposalData = {
      postId: post.postId,
      starId: post.starId,
      content: desc,
    };

    try {
      const response = await createProposal(proposalData);
      console.log('# 제안서 작성 결과');
      console.log(response);

      // TODO: 제안서 작성 완료 피드백
      navigate(0);
    } catch(err) {
      console.log(err);
    }
  }, [post, desc]);

  return (
    <>
      <Dialog open={open} onClose={() => {setDesc(''); onClose();}} >
        {post.err ? (
          <DialogContent sx={{ width: '450px', height: '200px', textAlign: 'center', lineHeight: '200px', overflow: 'hidden' }}>
            {post.err}
          </DialogContent>
        ) : (
          <>
            <DialogTitle sx={{ fontWeight: 'bold' }}>제안서 작성</DialogTitle>
            <DialogContent>
              <ProposalContent title={'스타'} width={300}>
                <MiniProfile name={post.starName} repImg={post.starImg} />
              </ProposalContent>
              <ProposalContent title={'일시'} width={300}>
                <Box sx={{ width: '100%', height: '50px', lineHeight: '50px', }}>
                  {post.date} {post.startTime?.substring(0,5)}~{post.endTime?.substring(0,5)}
                </Box>
              </ProposalContent>
              <ProposalContent title={'기타'} width={300}>
                <Box sx={{ width: '300px' }}>
                  <TextField
                    fullWidth
                    minRows={3}
                    multiline
                    placeholder='나에 대한 정보를 적어주세요.'
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                  />
                </Box>
              </ProposalContent>
            </DialogContent>
            
            <DialogActions sx={{ justifyContent: 'center' }}>
              <Button variant="contained" onClick={onSubmit}>제출</Button>
              <Button variant="contained" onClick={() => {setDesc(''); onClose();}}>닫기</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
};

export default WriteProposalDialog;