'use client';
import React, { useEffect, useState, useTransition } from 'react';
import { Backdrop, Box, Button, CircularProgress, Dialog, InputAdornment, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { deleteVipCookies, login } from '@/libs/actions';
import { LoginFormValues, LoginSchema } from './loginTypes';
import './LoginForm.scss';
import Toaster from '@/components/Toaster';
import en from '@/helpers/lang';
import ApplicationReviewDialog from '@/components/ApplicationReviewDialog';
import ApplicationRejectedDialog from '@/components/ApplicationRejectedDialog';
import { Login } from '@/libs/api-manager/manager';
import { UserRole } from '@/helpers/enums';

const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string>('');
  const [toasterOpen, setToasterOpen] = useState<boolean>(false);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState<boolean>(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<UserRole | ''>('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const isTokenExpired = searchParams.get('token-expired');
  const tokenExpiryError = searchParams.get('error');

  useEffect(() => {
    const deleteCookies = async () => {
      await deleteVipCookies();
    };
    deleteCookies();
  }, []);

  useEffect(() => {
    if (isTokenExpired) {
      setError(tokenExpiryError || 'User must be logged in.');
      setToasterOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    setToasterOpen(false);
    startTransition(async () => {
      try {
        const [data, userData] = await Promise.all([login(values), Login(values)]);
        setUserRole(userData?.role);
        if (data && data.error) {
          const errorMessage = data.error;
          if (errorMessage.includes('rejected')) {
            setIsRejectDialogOpen(true);
            reset();
          } else if (errorMessage.includes('not approved')) {
            setIsReviewDialogOpen(true);
            reset();
          } else {
            console.error(errorMessage);
            setError(errorMessage || 'An error occurred during login');
            setToasterOpen(true);
          }
        } else {
          if (userData?.role === UserRole.Vip) {
            router.push('/home');
          } else if (userData?.role === UserRole.Agent) {
            router.push('/my-vips');
          } else {
            router.push('/home');
          }
        }
      } catch (error) {
        console.error(error);
        setError('Error: ' + error);
        setToasterOpen(true);
      }
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} className="login-form">
      <TextField
        {...register('username')}
        placeholder="Email"
        label="Email"
        type="text"
        error={!!errors.username}
        helperText={errors.username?.message}
        autoComplete="email"
        fullWidth
      />

      <TextField
        {...register('password')}
        placeholder="Password"
        label="Password"
        type={showPassword ? 'text' : 'password'}
        error={!!errors.password}
        helperText={errors.password?.message}
        autoComplete="current-password"
        fullWidth
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
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <VisibilityOffIcon sx={{ color: 'white', '&:hover': { cursor: 'pointer' } }} />
                ) : (
                  <RemoveRedEyeIcon sx={{ color: 'white', '&:hover': { cursor: 'pointer' } }} />
                )}
              </Box>
            </InputAdornment>
          ),
        }}
      />
      <Box className="forgot-password">
        <Typography className="forgot-password__text">
          <Link href="/forgot-password" className="forgot-password__link">
            {en.helperText.forgotPassword}
          </Link>
        </Typography>
      </Box>
      <Button type="submit" disabled={isPending} fullWidth className="button button--white">
        {isPending ? en.helperText.loading : en.helperText.continue}
      </Button>
      <Typography className="signup-text">
        {en.helperText.noAccount}{' '}
        <Link href={'/on-boarding'}>
          <Typography
            variant="body2"
            component="span"
            sx={{
              textDecoration: 'underline',
              padding: 0,
              margin: 0,
              color: 'white',
              fontSize: '0.8rem',
              cursor: 'pointer',
            }}
          >
            {en.helperText.applyHere}
          </Typography>
        </Link>
      </Typography>
      <Toaster open={toasterOpen} setOpen={setToasterOpen} message={error} severity="error" />
      <Backdrop sx={{ color: '#fff', zIndex: 100 }} open={isPending}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Dialog open={isReviewDialogOpen} fullScreen aria-labelledby="form-dialog-title">
        <ApplicationReviewDialog isBrand={userRole === UserRole.Brand} />
      </Dialog>
      <Dialog open={isRejectDialogOpen} fullScreen aria-labelledby="form-dialog-title">
        <ApplicationRejectedDialog />
      </Dialog>
    </Box>
  );
};

export default LoginForm;
