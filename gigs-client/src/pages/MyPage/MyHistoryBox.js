import { Box } from '@mui/material';
import React from 'react';
import MyHistoryItem from './MyHistoryItem';

const MyHistoryBox = ({
  histories,
  onCancel,
}) => {
  return (
    <Box sx={{ width: '100%' }}>
      {histories?.map(history => (
        <MyHistoryItem
          proposalId={history.proposalId}
          host={{name: history.stageName, repImg: history.stageRepImg}}
          star={{name: history.starName, repImg: history.starRepImg}}
          date={history.showStartTime.format("YYYY-MM-DD")}
          status={history.showStatus}
          onCancel={onCancel}
        />
      ))}
    </Box>
  );
};

export default MyHistoryBox;