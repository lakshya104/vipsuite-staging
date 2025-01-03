'use client';
import * as React from 'react';
import { Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Image from 'next/image';
import { RefCallBack } from 'react-hook-form';
import CloseIcon from '@mui/icons-material/Close';
import Btn from '../Button/CommonBtn';

interface DialogBoxProps {
  isDialogOpen: boolean;
  onDataChange: RefCallBack;
  onDataChange2?: RefCallBack;
  content: {
    title: string;
    isCrossIcon?: boolean;
    image?: string;
    subTitle?: string;
    description?: string;
    description2?: string;
    buttonText?: string;
    buttonText2?: string;
  };
}

const DialogBox: React.FC<DialogBoxProps> = ({ isDialogOpen, onDataChange, content, onDataChange2 }) => {
  const handleClose = () => {
    onDataChange(false);
  };
  const handleClose2 = () => {
    if (onDataChange2) onDataChange2(false);
  };

  return (
    <Dialog
      className="site-dialog"
      onClose={onDataChange2 ? handleClose2 : handleClose}
      aria-labelledby="customized-dialog-title"
      open={isDialogOpen}
      maxWidth="sm"
      fullWidth
    >
      <Box mb={2}>
        <DialogTitle variant="h2" id="customized-dialog-title">
          {content?.title}
        </DialogTitle>
        <DialogContent>
          {content?.image && (
            <Box>
              <Image
                alt="Dialog Image"
                src={content?.image}
                height={199}
                width={199}
                sizes="(max-width: 199px) 100vw, 199px"
                style={{ objectFit: 'contain' }}
                priority
              />
            </Box>
          )}
          {content?.subTitle && (
            <Typography variant="h6" gutterBottom component="h3">
              {content.subTitle}
            </Typography>
          )}
          {content?.description && (
            <Typography variant="body1" gutterBottom>
              {content.description}
            </Typography>
          )}
          {content?.description2 && (
            <Typography variant="body1" gutterBottom>
              {content.description2}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Box display="flex" flexDirection="column" width="100%" gap={2}>
            <Btn onClick={handleClose} look="dark-filled" width="100%">
              {content?.buttonText || 'Close'}
            </Btn>
            {content?.buttonText2 && (
              <Btn onClick={handleClose2} look="dark-filled" width="100%">
                {content?.buttonText2 || 'Close'}
              </Btn>
            )}
          </Box>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default DialogBox;

interface MessageDialogBoxProps {
  isDialogOpen: boolean;
  // eslint-disable-next-line no-unused-vars
  onClose: (isOpen: boolean) => void;
  content: {
    title: string;
    isCrossIcon?: boolean;
    image?: string;
    subTitle?: string;
    description?: string;
    buttonText?: string;
  };
}

export const MessageDialogBox: React.FC<MessageDialogBoxProps> = ({ isDialogOpen, onClose, content }) => {
  const handleDialogClose = () => onClose(false);
  return (
    <Dialog
      className="site-dialog"
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={isDialogOpen}
      maxWidth="sm"
      fullWidth
    >
      <Box mb={2} position={'relative'}>
        <DialogTitle
          id="customized-dialog-title"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingRight: '16px',
          }}
        >
          {content?.title}
          {content?.isCrossIcon && (
            <CloseIcon
              sx={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                cursor: 'pointer',
              }}
              onClick={handleDialogClose}
            />
          )}
        </DialogTitle>
        <DialogContent>
          {content?.image && (
            <Box>
              <Image
                alt="Dialog Image"
                src={content?.image}
                height={199}
                width={199}
                sizes="(max-width: 199px) 100vw, 199px"
                style={{ objectFit: 'contain' }}
                priority
              />
            </Box>
          )}
          {content?.subTitle && (
            <Typography variant="h6" gutterBottom component="h3">
              {content.subTitle}
            </Typography>
          )}
          {content?.description && (
            <Typography variant="body1" gutterBottom>
              {content.description}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          {content?.buttonText && (
            <Btn onClick={handleDialogClose} look="dark-filled" width="100%">
              {content?.buttonText || 'Close'}
            </Btn>
          )}
        </DialogActions>
      </Box>
    </Dialog>
  );
};
