import styled from '@emotion/styled';
import { Box, Button } from '@mui/material';
import React from 'react';
import MiniProfile from './MiniProfile';
import {COLOR} from '../../utils/Constants';

const ProfileBox = styled(Box)((props) => ({
  width: '250px',
  height: '100%',
  display: 'flex',
}));

const ControlBox = styled(Box)((props) => ({
  width: '700px',
  height: '100%',
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
}));

const StatusBox = styled(Box)((props) => ({
  width: '100px',
  fontWeight: 'bold',
}));

const ControlButton = styled(Button)((props) => ({
  height: '35px',
  marginRight: '10px',
}));

const DateBox = styled(Box)((props) => ({
  position: 'absolute',
  top: 0,
  right: 0,
  width: '100px',
  height: '50px',
  lineHeight: '50px',
  textAlign: 'center',
  fontSize: '14px',
  color: COLOR.grey,
}));

const MyHistoryItem = ({
  proposalId,
  host,
  star,
  date,
  status,
  onCheckPhoneNumber,
  onCancel,
  onComplete,
}) => {
  const isComplete = status === 'COMP';

  return (
    <Box
      sx={{
        width: '100%',
        height: '50px',
        lineHeight: '50px',
        borderBottom: '.5px dotted black',
        display: 'flex',
      }}
    >
      <ProfileBox>
        <MiniProfile width='200px' name={host.name} repImg={host.repImg} />에서
      </ProfileBox>
      <ProfileBox>
        <MiniProfile width='200px' name={star.name} repImg={star.repImg} />공연
      </ProfileBox>
      <ControlBox>
        <StatusBox>{isComplete ? '완료' : '예정'}</StatusBox>
        {isComplete ? (null) : (
          <>
            <ControlButton variant='outlined' onClick={onCheckPhoneNumber}>연락처 확인</ControlButton>
            <ControlButton variant='contained' onClick={onComplete}>공연 완료</ControlButton>
            <ControlButton variant='contained' color='warning' onClick={onCancel}>공연 취소</ControlButton>
          </>
        )}
        <DateBox>{date}</DateBox>
      </ControlBox>
    </Box>
  );
};

export default MyHistoryItem;