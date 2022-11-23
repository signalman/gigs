import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React, { useCallback, useRef } from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

const EditIntroduceDialog = ({
  open,
  onClose,
  title,
  values,
  onEdit,
}) => {
  const editor = useRef();

  const handleEditClick = useCallback(() => {
    onEdit([editor.current.getContents()])
    onClose();
  }, [onEdit, onClose]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
    >
      <DialogTitle>
        {title}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ width: '1000px'}}>
          <SunEditor
            lang="ko"
            defaultValue={values[0]}
            height="400px"
            getSunEditorInstance={(sunEditor) => {editor.current = sunEditor}}
            setOptions={{
              buttonList: [
                ['fontSize', 'align'],
                // ['paragraphStyle', 'blockquote'],
                ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
                ['fontColor', 'hiliteColor', 'textStyle'],
                ['removeFormat'],
                ['outdent', 'indent'],
                // ['align', 'horizontalRule', 'list', 'lineHeight'],
              ]
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleEditClick}>변경</Button>
        <Button onClick={onClose}>취소</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditIntroduceDialog;