'use client';
import React, { useEffect } from 'react';
import UseToaster from '@/hooks/useToaster';
import Toaster from './Toaster';
import { Container, Typography } from '@mui/material';
import { signOut } from 'next-auth/react';

interface ErrorToasterProps {
  errorMessage: string;
  message: string;
  login?: boolean;
}

const ErrorToaster: React.FC<ErrorToasterProps> = ({ errorMessage, message, login }) => {
  const { toasterOpen, error, openToaster, closeToaster } = UseToaster();

  const handleLogin = () => {
    signOut({ callbackUrl: '/login' });
  };

  useEffect(() => {
    if (errorMessage) {
      openToaster(errorMessage);
    }
  }, [errorMessage, openToaster, message]);

  useEffect(() => {
    if (login) {
      const timeoutId = setTimeout(() => {
        handleLogin();
      }, 2000);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [login]);

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '40vh',
      }}
    >
      <Typography>{message}</Typography>
      <Toaster open={toasterOpen} setOpen={closeToaster} message={error} severity="error" />
    </Container>
  );
};

export default ErrorToaster;
