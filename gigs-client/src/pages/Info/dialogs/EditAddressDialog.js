import { Box, Button, Typography, TextField, Modal, Dialog, DialogActions, DialogContent, DialogTitle, Alert } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import DaumPostCode from 'react-daum-postcode';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  p: 4,
};

const EditAddressDialog = ({
  open,
  onClose,
  title,
  values,
  setValues,
  onEdit,
}) => {
  const [address, setAddress] = useState("");
  const [openPostCode, setOpenPostCode] = useState(false);
  
  const [alert, setAlert] = useState('');

  const handle = {
    Open: () => { setOpenPostCode(true); },

    Close: () => { setOpenPostCode(false); },
  }

  const handleSelectAddress = useCallback((data) => {
    setAddress(data.address)
    setValues([data.sido,data.sigungu,data.roadname + " " + data.addressEnglish.split(',')[0]])
    setOpenPostCode(false);
  }, [values, onEdit, onClose]);

  const handleTextChange = (e) => {
    const newValues = [...values];
    newValues[3] = e.target.value
    setValues(newValues);
  }

  const handleEditClick = useCallback(() => {
    if(!address || !values[3]) {
      setAlert('모든 정보를 입력해주세요.');
      return;
    }

    onEdit(values);
    onClose();
  }, [values, onEdit, onClose, address]);

  const handleClose = () => {
    setAddress('');
    setOpenPostCode(false);
    setValues([]);
    setAlert('');
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={false}
    >
      <DialogTitle>
        {title}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ width: '450px', mt: 2 }}>
          주소 &nbsp;
          <Button variant="contained"
            onClick={handle.Open}
            sx={{ mr: 2, ml: 1, width: 90 }}>
            검색
          </Button>
          <Modal
            open={openPostCode}
            onClose={handle.Close}>
            <Box sx={style}>
              <DaumPostCode
                onComplete={handleSelectAddress}
                autoClose={false}
              />
            </Box>
          </Modal>
          <TextField
            required
            variant="standard"
            name="address"
            InputProps={{
              readOnly: true,
            }}
            value={address}
          />
          <Box sx={{ display: 'flex', alignItems: 'flex-end', mt: 4 }}>
            상세주소 &nbsp;
            <TextField
              required
              variant="standard"
              name="detail_Address"
              onChange={handleTextChange}
            />
          </Box>
        </Box>
        {alert && <Alert sx={{ mt: '10px', }} severity="error">{alert}</Alert> }
      </DialogContent>
      <DialogActions>
        <Button onClick={handleEditClick}>변경</Button>
        <Button onClick={handleClose}>취소</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditAddressDialog;