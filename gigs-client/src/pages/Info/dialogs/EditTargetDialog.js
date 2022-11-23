import { Button, Select, MenuItem, Typography, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { useCallback } from 'react';

const EditTargetDialog = ({
  open,
  onClose,
  title,
  values,
  setValues,
  onEdit,
}) => {
  // 관객 나이대 변경 시
  const handleTargetAgeChange = useCallback((e) => {
    const newValues = [...values];
    newValues[0] = e.target.value;
    setValues(newValues);
  }, [values, setValues]); 

  // 관객 성별 변경 시
  const handleTargetGenderChange = useCallback((e) => {
    const newValues = [...values];
    newValues[1] = e.target.value;
    setValues(newValues);
  }, [values, setValues]);

  // 관객 최소 수 변경 시
  const handleTargetMinCountChange = useCallback((e) => {
    const newValues = [...values];
    newValues[2] = e.target.value < 0 ? 0 : e.target.value;
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
          onChange={handleTargetAgeChange}
        >
          <MenuItem value='all'>-</MenuItem>
          <MenuItem value='10'>10대</MenuItem>
          <MenuItem value='20'>20대</MenuItem>
          <MenuItem value='30'>30대</MenuItem>
          <MenuItem value='40'>40대</MenuItem>
          <MenuItem value='50'>50대</MenuItem>
          <MenuItem value='60'>60대 이상</MenuItem>
        </Select>
        <Select
          sx={{
            width: '100px',
            height: '30px',
            ml: `20px`,
          }}
          variant='standard'
          value={values[1]}
          onChange={handleTargetGenderChange}
        >
          <MenuItem value='MIXED'>모두</MenuItem>
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
          value={values[2]}
          onChange={handleTargetMinCountChange}
        ></TextField>
        <Typography sx={{ lineHeight: '30px', }}>
          명 이상
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleEditClick}>변경</Button>
        <Button onClick={onClose}>취소</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTargetDialog;