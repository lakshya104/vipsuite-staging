'use client';
import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import MyVipPage from '@/site-pages/MyVipsPage';

interface DialogComponentProps {
  token: string;
}

const DialogComponent: React.FC<DialogComponentProps> = ({ token }) => {
  const [open, setOpen] = useState(true);

  // Handle closing of the dialog
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="dialog-title" aria-describedby="dialog-description">
      <DialogTitle id="dialog-title">Dialog Title</DialogTitle>
      <DialogContent>
        <DialogContentText id="dialog-description">
          <MyVipPage token={token} />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogComponent;
