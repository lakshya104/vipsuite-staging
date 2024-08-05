'use client';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import Image from 'next/image';
import Btn from '../Button/CommonBtn';
import { RefCallBack } from 'react-hook-form';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    backgroundColor: '#fff',
    color: '#000',
    borderRadius: '16px',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(3),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(2),
  },
}));

interface DialogBoxProps {
  isDialogOpen: boolean;
  onDataChange: RefCallBack;
  content: {
    title: string;
    isCrossIcon?: boolean;
    image?: string;
    subTitle?: string;
    description?: string;
    buttonText?: string;
  };
}

const DialogBox: React.FC<DialogBoxProps> = ({ isDialogOpen, onDataChange, content }) => {
  const handleClose = () => {
    onDataChange(false);
  };

  return (
    <StyledDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={isDialogOpen}
      maxWidth="sm"
      fullWidth
    >
      <Box sx={{ position: 'relative', p: 2 }}>
        <DialogTitle
          component="h2"
          sx={{ m: 0, p: 2, fontSize: '1.5rem', fontWeight: 'bold', color: '#000' }}
          id="customized-dialog-title"
        >
          {content.title}
        </DialogTitle>
        {content.isCrossIcon && (
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 16,
              top: 16,
              color: '#000',
            }}
          >
            <CloseIcon />
          </IconButton>
        )}
        <DialogContent>
          {content.image && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <Image
                alt="Dialog Image"
                src={content.image}
                height={199}
                width={199}
                sizes="(max-width: 199px) 100vw, 199px"
                style={{ objectFit: 'contain' }}
                priority
              />
            </Box>
          )}
          {content.subTitle && (
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium', mb: 2, color: '#000' }}>
              {content.subTitle}
            </Typography>
          )}
          {content.description && (
            <Typography variant="body1" gutterBottom sx={{ mb: 2, color: '#000' }}>
              {content.description}
            </Typography>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Btn onClick={handleClose} look="dark-filled" width="100%">
            {content.buttonText || 'Close'}
          </Btn>
        </DialogActions>
      </Box>
    </StyledDialog>
  );
};

export default DialogBox;
