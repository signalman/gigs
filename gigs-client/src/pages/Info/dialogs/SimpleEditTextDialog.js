import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { useCallback, useState } from 'react';

const SimpleEditTexetDialog = ({
  open,
  onClose,
  title,
  type,
  onEdit,
}) => {
  const [text, setText] = useState('');

  const handleTextChange = (e) => {
    setText(e.target.value);
  }

  const handleEditClick = useCallback(() => {
    onEdit([text]);
    onClose();
  }, [text, onEdit, onClose]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>
        {title}
      </DialogTitle>
      <DialogContent>
        <TextField
          value={text}
          onChange={handleTextChange}
          type={type}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleEditClick}>변경</Button>
        <Button onClick={onClose}>취소</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SimpleEditTexetDialog;