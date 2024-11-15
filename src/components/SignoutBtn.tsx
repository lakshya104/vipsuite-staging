'use client';
import React, { useState } from 'react';
import { signOut } from 'next-auth/react';
import { Backdrop, Button, CircularProgress, Typography } from '@mui/material';
import UseToaster from '@/hooks/useToaster';
import { LogOut } from '@/libs/api-manager/manager';
import Toaster from './Toaster';
import { useUserInfoStore } from '@/store/useStore';
// import { ProgressBarLink } from './ProgressBar';

const SignoutBtn = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toasterOpen, error, openToaster, closeToaster } = UseToaster();
  const { clearAll } = useUserInfoStore();
  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await LogOut();
      clearAll();
      signOut({ callbackUrl: '/', redirect: true });
      localStorage.clear();
    } catch (error) {
      setIsLoading(false);
      openToaster('Error during logging out. ' + error);
    }
  };
  return (
    <>
      <Typography variant="body1">
        <Button onClick={handleLogout} className="button button--sign-out">
          Sign Out
        </Button>
      </Typography>
      <Backdrop sx={{ color: '#fff', zIndex: 100000 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Toaster open={toasterOpen} setOpen={closeToaster} message={error} severity="error" />
    </>
  );
};

export default SignoutBtn;
