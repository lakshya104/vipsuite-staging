'use client';
import React, { Fragment, useEffect } from 'react';
import UseToaster from '@/hooks/useToaster';
import Toaster from './Toaster';
import { signOut } from 'next-auth/react';
import ErrorFallback from './ErrorFallback';

interface ErrorToasterProps {
  errorMessage: string;
  message: string;
  login?: boolean;
}

const ErrorToaster: React.FC<ErrorToasterProps> = ({
  errorMessage = 'Something unecpected occured',
  message,
  login = false,
}) => {
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
      }, 1250);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [login]);

  return (
    <Fragment>
      <ErrorFallback errorMessage={message} />
      <Toaster open={toasterOpen} setOpen={closeToaster} message={error} severity="error" />
    </Fragment>
  );
};

export default ErrorToaster;
