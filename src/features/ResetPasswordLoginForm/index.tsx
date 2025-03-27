'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Backdrop, Box, Button, CircularProgress, InputAdornment } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import InputForm from '@/components/InputForm/InputForm';
import Toaster from '@/components/Toaster';
import './ResetPasswordLoginForm.scss';
import { ResetPasswordWithLogin } from '@/libs/api-manager/manager';
import { defaultValues, ResetPasswordFormValues, ResetPasswordSchema } from './schema';
import UseToaster from '@/hooks/useToaster';
import en from '@/helpers/lang';
import { paths } from '@/helpers/paths';
import { deleteVipCookies, loginServerAction } from '@/libs/actions';
import { UserRole } from '@/helpers/enums';
import { useUserInfoStore } from '@/store/useStore';

const ResetPasswordLoginForm = () => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const userMail64String = searchParams.get('login');
  const resetKey = searchParams.get('key');
  const { toasterOpen, error, openToaster, closeToaster } = UseToaster();
  const { clearAll } = useUserInfoStore();

  useEffect(() => {
    const deleteCookies = async () => {
      await deleteVipCookies();
      clearAll();
    };
    deleteCookies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: defaultValues,
  });

  useEffect(() => {
    if (!userMail64String || !resetKey) {
      openToaster(en.login.errorMessage.resetPassLogin);
      const timeOut = setTimeout(() => {
        router.push(paths.auth.login.getHref());
      }, 1500);
      return () => clearTimeout(timeOut);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (values: ResetPasswordFormValues) => {
    setIsPending(true);
    const userMail = atob(userMail64String ?? '');
    try {
      const resetData = {
        password_reset_key: resetKey ?? '',
        email: userMail64String ?? '',
        password: values.password,
      };
      const loginActionData = {
        username: userMail,
        password: values.password,
      };
      const userData = await ResetPasswordWithLogin(resetData);
      if (userData) {
        const data = await loginServerAction(loginActionData);
        if (data?.error) {
          const errorMessage = data.error;
          console.error(errorMessage);
          openToaster(errorMessage ?? en.login.loginError);
          setIsPending(false);
        } else {
          if (userData.role === UserRole.Vip) {
            router.push(paths.root.home.getHref());
          } else if (userData.role === UserRole.Agent) {
            router.push(paths.root.myVips.getHref());
          } else {
            router.push(paths.root.home.getHref());
          }
        }
      }
    } catch (error) {
      openToaster(String(error));
      reset();
      setIsPending(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} className="forgot-password-form">
      <InputForm
        {...register('password')}
        placeholder={en.common.password}
        type={showNewPassword ? 'text' : 'password'}
        error={!!errors.password}
        helperText={errors.password?.message}
        autoComplete="new-password"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Box
                sx={{
                  p: 0,
                  m: 0,
                  minWidth: 'auto',
                  width: 'auto',
                  height: 'auto',
                }}
                onClick={() => setShowNewPassword((prev) => !prev)}
              >
                {showNewPassword ? (
                  <VisibilityOffIcon sx={{ color: 'white', '&:hover': { cursor: 'pointer' } }} />
                ) : (
                  <RemoveRedEyeIcon sx={{ color: 'white', '&:hover': { cursor: 'pointer' } }} />
                )}
              </Box>
            </InputAdornment>
          ),
        }}
      />
      <InputForm
        {...register('repeatPassword')}
        placeholder={en.common.repeatPassword}
        type={showRepeatPassword ? 'text' : 'password'}
        error={!!errors.repeatPassword}
        helperText={errors.repeatPassword?.message}
        autoComplete="new-password"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Box
                sx={{
                  p: 0,
                  m: 0,
                  minWidth: 'auto',
                  width: 'auto',
                  height: 'auto',
                }}
                onClick={() => setShowRepeatPassword((prev) => !prev)}
              >
                {showRepeatPassword ? (
                  <VisibilityOffIcon sx={{ color: 'white', '&:hover': { cursor: 'pointer' } }} />
                ) : (
                  <RemoveRedEyeIcon sx={{ color: 'white', '&:hover': { cursor: 'pointer' } }} />
                )}
              </Box>
            </InputAdornment>
          ),
        }}
      />
      <Button type="submit" disabled={isPending} fullWidth className="button button--white">
        {isPending ? en.login.resetPassword.saving : en.login.resetPassword.save}
      </Button>
      <Backdrop sx={{ color: '#fff', zIndex: 100 }} open={isPending}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Toaster open={toasterOpen} setOpen={closeToaster} message={error} severity="error" />
    </Box>
  );
};

export default ResetPasswordLoginForm;
