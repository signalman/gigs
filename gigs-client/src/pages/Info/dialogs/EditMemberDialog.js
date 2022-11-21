import { Button, Select, MenuItem, Typography, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { useCallback } from 'react';

const EditMemberDialog = ({
  open,
  onClose,
  title,
  values,
  setValues,
  onEdit,
}) => {
  // 멤버 성별 변경 시
  const handleGenderChange = useCallback((e) => {
    const newValues = [...values];
    newValues[0] = e.target.value;
    setValues(newValues);
  }, [values, setValues]); 

  // 멤버 수 변경 시
  const handleMemberNumberChange = useCallback((e) => {
    const newValues = [...values];
    newValues[1] = e.target.value < 0 ? 0 : e.target.value;
    setValues(newValues);
  }, [values, setValues]);

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
      <DialogContent sx={{ display: 'flex', }}>
        <Select
          sx={{
            width: '100px',
            height: '30px',
          }}
          variant='standard'
          value={values[0]}
          onChange={handleGenderChange}
        >
          <MenuItem value='MIXED'>혼성</MenuItem>
          <MenuItem value='MEN'>남성</MenuItem>
          <MenuItem value='WOMEN'>여성</MenuItem>
        </Select>
        <TextField
          sx={{
            width: '50px',
            height: '30px',
            alignSelf: 'center',
            ml: `20px`,
          }}
          type='number'
          variant='standard'
          value={values[1]}
          onChange={handleMemberNumberChange}
        ></TextField>
        <Typography sx={{ lineHeight: '30px', }}>
          인
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleEditClick}>변경</Button>
        <Button onClick={onClose}>취소</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditMemberDialog;