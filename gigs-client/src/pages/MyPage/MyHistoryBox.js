import styled from '@emotion/styled';
import { Box } from '@mui/material';
import React from 'react';
import { useCookies } from 'react-cookie';
import { COLOR } from '../../utils/Constants';
import MyHistoryItem from './MyHistoryItem';

const NoHistoriesMessage = styled(Box)((props) => ({
  width: '100%',
  height: '250px',
  lineHeight: '250px',
  textAlign: 'center',
  fontSize: '22px',
  color: COLOR.grey,
  fontWeight: 'bold',
  backgroundColor: COLOR.whity,
}));

const MyHistoryBox = ({
  histories,
  onCheckPhoneNumber,
  onCancel,
  onComplete,
  onWriteReview,
}) => {
  const [cookies, setCookie, removeCookie] = useCookies(['role']);

  return (
    <Box sx={{ width: '100%' }}>
      {histories?.length === 0 ? (
        <NoHistoriesMessage>예정/완료된 공연이 없습니다.</NoHistoriesMessage>
      ) : (
        histories?.map(history => {
          const hasReview = cookies.role === 'star' ? history.starToHostReviewed : history.hostToStarReviewed;

          return (
            <MyHistoryItem
              proposalId={history.proposalId}
              host={{name: history.stageName, repImg: history.stageRepImg}}
              star={{name: history.starName, repImg: history.starRepImg}}
              date={history.showStartTime.format("YYYY-MM-DD")}
              status={history.showStatus}
              hasReview={hasReview}
              onCheckPhoneNumber={() => onCheckPhoneNumber(history.proposalId)}
              onCancel={() => onCancel(history.proposalId)}
              onComplete={() => onComplete(history.proposalId)}
              onWriteReview={() => onWriteReview(history.proposalId)}
            />
          );
        })
      )}
    </Box>
  );
};

export default MyHistoryBox;