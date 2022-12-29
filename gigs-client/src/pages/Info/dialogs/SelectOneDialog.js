import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React, { useCallback } from 'react';
import CategoryItem from '../../../components/CategoryItem';

const SelectOneDialog = ({
  open,
  onClose,
  title,
  values,
  setValues,
  onEdit,
  items,
}) => {
  const handleItemClick = (item) => {
    setValues([item]);
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
        <Box sx={{ display: 'flex', width: '500px', flexWrap: 'wrap', alignContent: 'flex-start' }}>
          {items?.map(item => (
            <CategoryItem key={item} selected={values[0] === item} selectItem={handleItemClick}>{item}</CategoryItem>
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleEditClick}>변경</Button>
        <Button onClick={onClose}>취소</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SelectOneDialog;