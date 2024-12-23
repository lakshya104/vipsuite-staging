'use client';
import React, { useTransition } from 'react';
import { Backdrop, Button, CircularProgress, Typography } from '@mui/material';
import UseToaster from '@/hooks/useToaster';
import { LogOut } from '@/libs/api-manager/manager';
import Toaster from './Toaster';
import { useUserInfoStore } from '@/store/useStore';
import { signOutAction } from '@/libs/actions';

interface SignoutBtnProps {
  token: string;
}

const SignoutBtn: React.FC<SignoutBtnProps> = ({ token }) => {
  const [isPending, startTransition] = useTransition();
  const { toasterOpen, error, openToaster, closeToaster } = UseToaster();
  const { clearAll } = useUserInfoStore();
  const handleLogout = async () => {
    startTransition(async () => {
      try {
        await Promise.all([LogOut(token), clearAll(), signOutAction()]);
      } catch (error) {
        openToaster('Error during logging out. ' + error);
      } finally {
        window.location.href = '/';
      }
    });
  };
  return (
    <>
      <Typography variant="body1">
        <Button onClick={handleLogout} className="button button--sign-out">
          Sign Out
        </Button>
      </Typography>
      <Backdrop sx={{ color: '#fff', zIndex: 100000 }} open={isPending}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Toaster open={toasterOpen} setOpen={closeToaster} message={error} severity="error" />
    </>
  );
};

export default SignoutBtn;
