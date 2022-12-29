import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React from 'react';

const AlertDialog = ({
  open,
  onClose,
  title,
  content,
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
        <Button onClick={onPositive} >확인</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;