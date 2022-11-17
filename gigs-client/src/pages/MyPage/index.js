import { Box } from '@mui/material';
import React from 'react';
import MyAccountBox from './MyAccountBox';
import MyHistoryBox from './MyHistoryBox';
import MyInfoBox from './MyInfoBox';
import MyPageItem from './MyPageItem';
import MyProposalBox from './MyProposalBox';

const MyPage = () => {
  return (
    <Box sx={{ width: '1200px', margin: '0 auto', }}>
      <MyPageItem title="내 계정">
        <MyAccountBox />
      </MyPageItem>
      <MyPageItem title="내 무대">
        <MyInfoBox />
      </MyPageItem>
      <MyPageItem title="공연 기록">
        <MyHistoryBox />
      </MyPageItem>
      <MyPageItem title="제안서">
        <MyProposalBox />
      </MyPageItem>
    </Box>
  );
};

export default MyPage;