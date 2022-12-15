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
  console.log(timeTable);

  // 제안서 작성 다이얼로그 관련
  const [selectedPost, setSelectedPost] = useState({
    err: '데이터를 불러오는 중 입니다.'
  });
  const [isWriteProposalDialogOpen, setWriteProposalDialogOpen] = useState(false);
  const handleCloseWriteProposalDialog = () => {
    setWriteProposalDialogOpen(false);
  };
  
  // 포스트 아이템을 클릭했을 때
  const handleClickPost = useCallback(async (postId) => {
    try {
      const response = await getProposalFormById(postId);
      console.log('# 제안서 폼 가져온 결과');
      console.log(response);

      // 만약 스타의 이름이 작성되어 있지 않다면,
      // 스타의 정보가 불완전한 것으로 간주하고 제안서 작성할 수 없게 함
      if(response.data.starName) {
        setSelectedPost(response.data);
      } else {
        setSelectedPost({ err: '스타 정보를 먼저 작성해주세요.' });
      }

      setWriteProposalDialogOpen(true);
    } catch (err) {
      console.log(err);
      setSelectedPost({ err: err.response.data });
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