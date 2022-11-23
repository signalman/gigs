import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { useCallback } from 'react';

const SimpleEditTexetDialog = ({
  open,
  onClose,
  title,
  type,
  values,
  setValues,
  onEdit,
}) => {
  const handleTextChange = (e) => {
    setValues([e.target.value]);
  }

  const handleEditClick = useCallback(() => {
    onEdit(values);
    onClose();
  }, [values, onEdit, onClose]);

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
          value={values[0]}
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