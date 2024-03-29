import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import React from 'react';
import EditIcon from '@mui/icons-material/Edit';

const Container = styled(Box)((props) => ({
  width: '500px',
  height: '50px',
  display: 'flex',
}));

const IconBox = styled(Box)(() => ({
  width: '50px',
  height: '50px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const IconStyle = {
  width: '20px',
  height: '20px'
};

const ItemContent = styled(Typography)((props) => ({
  width: '400px',
  height: '50px',
  lineHeight: '50px',
  fontSize: '15px',
}));

const DetailInfoItem = ({
  Icon,
  children,
  editable,
  onEdit,
}) => {
  return (
    <Container>
      <IconBox>
        <Icon sx={IconStyle} />
      </IconBox>
      <ItemContent>{children}</ItemContent>
      {editable ? (
        <IconBox onClick={() => onEdit()} sx={{ cursor: 'pointer', }}>
          <EditIcon sx={IconStyle} />
        </IconBox>
      ) : (<></>)}
    </Container>
  );
};

export default DetailInfoItem;