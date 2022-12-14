import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React, { useCallback } from 'react';
import CategoryItem from '../../../components/CategoryItem';

const SelectAllDialog = ({
  open,
  onClose,
  title,
  values,
  setValues,
  onEdit,
  items,
}) => {
  const handleItemClick = useCallback((item) => {
    let newItems;

    const hasItem = values[0]?.find(value => value === item);
    if(hasItem) newItems = values[0]?.filter(value => value !== item);
    else newItems = [...values[0], item];

    setValues([newItems]);
  }, [values, setValues]);

  const handleEditClick = useCallback(() => {
    console.log(values)
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
            <CategoryItem key={item} selected={values[0]?.find(value => value === item)} selectItem={handleItemClick}>{item}</CategoryItem>
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

export default SelectAllDialog;