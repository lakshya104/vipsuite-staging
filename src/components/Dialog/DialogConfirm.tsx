'use client';
import React from 'react';
import { Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Btn from '../Button/CommonBtn';

interface DialogBoxProps {
  open: boolean;
  onClose: () => void; // Simplified type to match typical callback structure
  onConfirm: () => void; // Action to perform when user confirms (e.g., delete)
  title: string;
  description?: string;
}

const DialogConfirmBox: React.FC<DialogBoxProps> = ({ open, onClose, onConfirm, title, description }) => {
  // Close handler for the dialog
  const handleClose = () => {
    onClose(); // Just triggers the onClose callback without any parameters
  };

  // Confirmation handler when user clicks "Yes"
  const handleConfirm = () => {
    onConfirm(); // Triggers the onConfirm action, typically used for the deletion or main action
    onClose(); // Optionally close the dialog after the confirmation action
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
            Yes
          </Btn>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default DialogConfirmBox;
