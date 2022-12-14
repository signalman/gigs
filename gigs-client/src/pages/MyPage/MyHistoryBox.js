import { Box } from '@mui/material';
import React from 'react';
import MyHistoryItem from './MyHistoryItem';

const MyHistoryBox = ({
  histories,
}) => {
  return (
    <Box sx={{ width: '100%' }}>
      {histories?.map(history => (
        <MyHistoryItem
          host={{name: history.stageName, repImg: history.stageRepImg}}
          star={{name: history.starName, repImg: history.starRepImg}}
          date={history.showStartTime.format("YYYY-MM-DD")}
          status={history.showStatus}
        />
      ))}
    </Box>
  );
};

export default MyHistoryBox;