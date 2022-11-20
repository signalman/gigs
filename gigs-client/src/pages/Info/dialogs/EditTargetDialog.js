import { Button, Select, MenuItem, Typography, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { useCallback, useState } from 'react';

const EditTargetDialog = ({
  open,
  onClose,
  title,
  onEdit,
}) => {
  const [targetAge, setTargetAge] = useState("all");
  const [targetGender, setTargetGender] = useState("MIXED");
  const [targetMinCount, setTargetMinCount] = useState(0);

  // 관객 나이대 변경 시
  const handleTargetAgeChange = (e) => {
    setTargetAge(e.target.value);
  };

  // 관객 성별 변경 시
  const handleTargetGenderChange = (e) => {
    setTargetGender(e.target.value);
  };

  // 관객 최소 수 변경 시
  const handleTargetMinCountChange = (e) => {
    const count = Number(e.target.value); 
    setTargetMinCount(count < 0 ? 0 : count);
  };

  const handleEditClick = useCallback(() => {
    onEdit([targetAge, targetGender, targetMinCount]);
    onClose();
  }, [targetAge, targetGender, targetMinCount, onEdit, onClose]);

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
          value={targetAge}
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
          value={targetGender}
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
          value={targetMinCount}
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