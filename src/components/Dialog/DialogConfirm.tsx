'use client';
import React from 'react';
import { Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Btn from '../Button/CommonBtn';

interface DialogBoxProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  confirmText?: string;
}

const DialogConfirmBox: React.FC<DialogBoxProps> = ({ open, onClose, onConfirm, title, description, confirmText }) => {
  const handleClose = () => {
    onClose();
  };
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog
      className="site-dialog"
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      maxWidth="sm"
      fullWidth
    >
      <Box mb={2}>
        <DialogTitle variant="h2" id="customized-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            {description}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Btn onClick={handleClose} look="dark-filled" width="100%">
            No
          </Btn>
          <Btn onClick={handleConfirm} look="dark-filled" width="100%">
            {confirmText || 'Yes'}
          </Btn>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default DialogConfirmBox;
