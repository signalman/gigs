import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React from 'react';

const SimpleDialog = ({
  open,
  onClose,
  title,
  content,
  onNegative,
  onPositive,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onNegative} color='warning'>취소</Button>
        <Button onClick={onPositive} >확인</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SimpleDialog;