import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { useCallback, useState } from 'react';
import CategoryItem from '../../../components/CategoryItem';

const SelectOneDialog = ({
  open,
  onClose,
  title,
  onEdit,
  items,
}) => {
  // const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');

  const handleItemClick = (item) => {
    setSelectedItem(item);
  }

  const handleEditClick = useCallback(() => {
    onEdit([selectedItem]);
    onClose();
  }, [selectedItem, onEdit, onClose]);

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
            <CategoryItem key={item} selected={selectedItem === item} selectItem={handleItemClick}>{item}</CategoryItem>
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