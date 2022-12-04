import { Grid } from '@mui/material';
import React, { useCallback, useState } from 'react';
import WriteProposalDialog from '../../components/WriteProposal';
import { getProposalFormById } from '../../utils/Api';
import ReservationItem from './ReservationItem';

const ReservationTable = ({
  timeTable,
  onDeletePost,
  editable,
}) => {
  // 제안서 작성 다이얼로그 관련
  const [selectedPost, setSelectedPost] = useState({
    err: '데이터를 불러오는 중 입니다.'
  });
  const [isWriteProposalDialogOpen, setWriteProposalDialogOpen] = useState(false);
  const handleCloseWriteProposalDialog = () => {
    setWriteProposalDialogOpen(false);
  };
  
  const handleClickPost = useCallback(async (postId) => {
    try {
      const response = await getProposalFormById(postId);
      console.log('# 제안서 폼 가져온 결과');
      console.log(response);

      setSelectedPost(response.data);
      setWriteProposalDialogOpen(true);
    } catch (err) {
      console.log(err);
      setSelectedPost({ name: 'park' });
      setWriteProposalDialogOpen(true);

    }
  }, []);

  return (
    <>
      <Grid container sx={{ width: '480px', boxShadow: '0 0 4px black', backgroundColor: 'white', minHeight: '380px' }}>
        {timeTable?.map((item) => (
          <ReservationItem key={`${item.date} ${item.startTime}`} onDeletePost={onDeletePost} editable={editable} data={item} onClickPost={handleClickPost} />
        ))}
      </Grid>
      <WriteProposalDialog open={isWriteProposalDialogOpen} onClose={handleCloseWriteProposalDialog} post={selectedPost} />
    </>
    
  );
};

export default ReservationTable;