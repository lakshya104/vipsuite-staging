'use client';
import * as React from 'react';
import Snackbar, { SnackbarProps, SnackbarOrigin } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface ToasterProps extends SnackbarProps {
  open: boolean;
  // eslint-disable-next-line no-unused-vars
  setOpen: (open: boolean) => void;
  message: string;
  severity: 'error' | 'warning' | 'info' | 'success';
  anchorOrigin?: SnackbarOrigin;
}

const Toaster: React.FC<ToasterProps> = ({
  open,
  setOpen,
  severity,
  message,
  autoHideDuration = 5000,
  anchorOrigin = { vertical: 'top', horizontal: 'center' },
  ...rest
}) => {
  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      anchorOrigin={anchorOrigin}
      {...rest}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        variant="filled"
        sx={{
          width: '100%',
          backgroundColor: severity === 'error' ? 'red' : severity === 'info' ? 'white' : 'black',
          color: severity === 'info' ? 'black' : 'white',
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toaster;
