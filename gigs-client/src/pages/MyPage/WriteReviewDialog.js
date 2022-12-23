import styled from '@emotion/styled';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Rating, TextField } from '@mui/material';
import React, { useCallback, useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { writeReview } from '../../utils/Api';
import { useNavigate } from 'react-router-dom';

const ContentContainer = styled(Box)((props) => ({
  
}));

const RatingBox = styled(Box)((props) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  height: '30px',
  lineHeight: '30px',
  fontSize: '18px',
  fontWeight: 'bold',
}));

const ContentBox = styled(Box)((props) => ({
  marginTop: '20px',
  width: '500px',
  fontSize: '16px',
}));

const WriteReviewDialog = ({
  open,
  onClose,
  proposalId,
}) => {
  const navigate = useNavigate();

  const [score, setScore] = useState(0);
  const [content, setContent] = useState('');

  const handleClose = () => {
    setScore(0);
    setContent('');

    onClose();
  };

  const handleWrite = useCallback(async () => {
    const reviewData = {
      proposalId, score, content,
    };

    try {
      const response = await writeReview(reviewData);
      console.log('# 리뷰 작성 결과');
      console.log(response);

      handleClose();
      navigate(0);
    } catch(err) {
      console.log(err);
    }
  }, [handleClose, proposalId, score, content]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        리뷰 작성
      </DialogTitle>
      <DialogContent>
        <ContentContainer>
          <RatingBox>
            별점: 
            <Rating
              sx={{ width: `150px`, height: '30px', ml: '10px' }}
              emptyIcon={<StarBorderIcon sx={{ width: `30px`, height: `30px` }}></StarBorderIcon>}
              icon={<StarIcon sx={{ width: `30px`, height: `30px` }}></StarIcon>}
              value={Number(score)} precision={0.5} onChange={(e) => setScore(e.target.value)}
            />
          </RatingBox>
          <ContentBox>
            <TextField
              fullWidth
              minRows={3}
              maxRows={3}
              multiline
              placeholder='공연 후기를 기록해주세요.'
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </ContentBox>
        </ContentContainer>
      </DialogContent>
      <DialogActions>
        <Button variant='contained' color='warning' onClick={handleClose} >취소</Button>
        <Button variant='contained' onClick={handleWrite} >작성</Button>
      </DialogActions>
    </Dialog>
  );
};

export default WriteReviewDialog;