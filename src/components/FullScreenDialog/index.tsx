'use client';
import * as React from 'react';
import { Box, Typography, Dialog, DialogContent, Button } from '@mui/material';
import Image from 'next/image';
import './FullScreenDialog.scss';
import { DefaultImageFallback } from '@/helpers/enums';

interface FullScreenDialogProps {
  isOpen: boolean;
  onClose: () => void;
  content: {
    title: string;
    image?: string;
    subTitle: string;
    description: string;
    buttonText: string;
  };
}

const FullScreenDialog: React.FC<FullScreenDialogProps> = ({ isOpen, onClose, content }) => {
  const handleClose = (event: unknown, reason: 'backdropClick' | 'escapeKeyDown') => {
    if (reason === 'backdropClick') {
      return;
    }
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      disableEscapeKeyDown
      PaperProps={{
        sx: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 2,
          textAlign: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#FFFFF7',
        },
      }}
    >
      <Box className="order-status">
        <Typography variant="h6">{content?.title}</Typography>
        <DialogContent className="order-status__wrapper">
          {content.image && (
            <Box className="order-status__img">
              <Image
                src={content?.image || DefaultImageFallback.Placeholder}
                alt="Dialog Image"
                width={300}
                height={300}
                style={{ objectFit: 'contain', marginBottom: 16 }}
              />
            </Box>
          )}
          <Typography className="order-status__subtitle" variant="h5" component="div">
            {content.subTitle}
          </Typography>
          <Typography variant="body1">{content?.description}</Typography>
          <Button variant="contained" className="button button--black" onClick={onClose}>
            {content?.buttonText}
          </Button>
        </DialogContent>
      </Box>
    </Dialog>
  );
};

export default FullScreenDialog;
