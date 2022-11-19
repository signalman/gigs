import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import MyAccountBox from './MyAccountBox';
import MyHistoryBox from './MyHistoryBox';
import MyInfoBox from './MyInfoBox';
import MyPageItem from './MyPageItem';
import MyProposalBox from './MyProposalBox';
import { fetchMyPage } from '../../utils/Api';
import MyStarStatusSwitch from './MyStarStatusSwitch';

const MyPage = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    fetchMyPage((response) => {
      console.log(response);

      setUser({...response.data.user, roleId: response.data.roleId, status: response.data.status === "ACTIVE" ? true : false});
    })
  }, []);

  return (
    <Box sx={{ width: '1200px', margin: '0 auto', }}>
      <MyPageItem title="내 계정">
        <MyAccountBox user={user} />
      </MyPageItem>
      <MyPageItem title={user.role === "ROLE_HOST" ? "내 무대" : (user.role === "ROLE_STAR" ? "내 스타" : "")}>
        {user.role === "ROLE_STAR" ? (<MyStarStatusSwitch status={user.status} />) : (<></>)}
        <MyInfoBox role={user.role} roleId={user.roleId} />
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