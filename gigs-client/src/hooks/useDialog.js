import { useState } from "react";

const useDialog = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const openDialog = () => {
    setDialogOpen(true);
  }

  const closeDialog = () => {
    setDialogOpen(false);
  }

  return [isDialogOpen, openDialog, closeDialog];
}

export default useDialog;