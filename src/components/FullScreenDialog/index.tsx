'use client';
import * as React from 'react';
import { Box, Typography, Dialog, DialogContent, Button } from '@mui/material';
import Image from 'next/image';
import './FullScreenDialog.scss';

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
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
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
        <Typography variant="h6">{content.title}</Typography>
        <DialogContent className="order-status__wrapper">
          {content.image && (
            <Box className="order-status__img">
              <Image
                src={content.image}
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
          <Typography variant="body1">{content.description}</Typography>
          <Button variant="contained" className="button button--black" onClick={onClose}>
            {content.buttonText}
          </Button>
        </DialogContent>
      </Box>
    </Dialog>
  );
};

export default FullScreenDialog;
