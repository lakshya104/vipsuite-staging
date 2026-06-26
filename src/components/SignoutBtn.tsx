'use client';
import React, { useTransition } from 'react';
import { Backdrop, Button, CircularProgress, Typography } from '@mui/material';
import UseToaster from '@/hooks/useToaster';
import { LogOut } from '@/libs/api-manager/manager';
import Toaster from './Toaster';
import en from '@/helpers/lang';
import { useInstaInfo, useMessageCountStore, useTiktokInfo, useUserStatusStore } from '@/store/useStore';
import { isRedirectError } from 'next/dist/client/components/redirect-error';

const SignoutBtn = () => {
  const [isPending, startTransition] = useTransition();
  const { toasterOpen, error, openToaster, closeToaster } = UseToaster();
  const clearInstaInfo = useInstaInfo((state) => state.clearAll);
  const clearTiktokInfo = useTiktokInfo((state) => state.clearAll);
  const { clearAll } = useUserStatusStore();
  const { setMessageCount } = useMessageCountStore();
  const handleLogout = async () => {
    startTransition(async () => {
      try {
        await LogOut();
        setMessageCount(0);
        clearAll();
        clearInstaInfo();
        clearTiktokInfo();
        localStorage.clear();
        sessionStorage.clear();
        // Navigate directly via browser GET so /api/signout can clear cookies
        // and send Clear-Site-Data header before redirecting to /login
        window.location.href = '/api/signout';
      } catch (error) {
        if (isRedirectError(error)) {
          throw error;
        }
        openToaster(en.signOutButton.errorMessage + error);
      }
    });
  };
  return (
    <>
      <Typography variant="body1">
        <Button onClick={handleLogout} className="button button--sign-out">
          {en.common.signOut}
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
