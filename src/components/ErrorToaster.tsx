'use client';
import React, { Fragment, useEffect } from 'react';
import UseToaster from '@/hooks/useToaster';
import Toaster from './Toaster';
import { signOut } from 'next-auth/react';
import ErrorFallback from './ErrorFallback';
import { paths, withSearchParams } from '@/helpers/paths';
import en from '@/helpers/lang';
import { signOutAction } from '@/libs/actions';

interface ErrorToasterProps {
  errorMessage: string;
  message: string;
  login?: boolean;
}

const ErrorToaster: React.FC<ErrorToasterProps> = ({
  errorMessage = en.errorToaster.errorMessage,
  message,
  login = false,
}) => {
  const { toasterOpen, error, openToaster, closeToaster } = UseToaster();

  useEffect(() => {
    const signOutUser = async () => {
      signOut({
        callbackUrl: withSearchParams(() => paths.auth.login.getHref(), {
          'token-expired': 'true',
          error: errorMessage || en.errorToaster.userLogged,
        }),
      });
      await signOutAction();
    };
    if (login) {
      signOutUser();
    } else if (errorMessage) {
      openToaster(errorMessage);
    }
  }, [errorMessage, login, openToaster]);

  return (
    <Fragment>
      <ErrorFallback errorMessage={message} />
      <Toaster open={toasterOpen} setOpen={closeToaster} message={error} severity="error" />
    </Fragment>
  );
};

export default ErrorToaster;
