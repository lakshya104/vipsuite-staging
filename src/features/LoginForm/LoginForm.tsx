'use client';
import React, { useEffect, useState, useTransition } from 'react';
import { Backdrop, Box, Button, CircularProgress, Dialog, InputAdornment, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { isUndefined } from 'lodash';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { deleteVipCookies, login } from '@/libs/actions';
import { LoginFormValues, LoginSchema } from './loginTypes';
import './LoginForm.scss';
import Toaster from '@/components/Toaster';
import en from '@/helpers/lang';
import ApplicationReviewDialog from '@/components/ApplicationReviewDialog';
import ApplicationRejectedDialog from '@/components/ApplicationRejectedDialog';

const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [error, setError] = useState<string>('');
  const [toasterOpen, setToasterOpen] = useState<boolean>(false);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState<boolean>(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => {
    const deleteCookies = async () => {
      await deleteVipCookies();
    };
    deleteCookies();
  }, []);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleNavigation = () => {
    startTransition(() => {
      router.push('/on-boarding');
    });
  };

  const onSubmit = (values: LoginFormValues) => {
    setToasterOpen(false);
    startTransition(() => {
      login(values)
        .then((data) => {
          if (data && data.error) {
            const errorMessage = data.error;
            if (errorMessage.includes('rejected')) {
              setIsRejectDialogOpen(true);
              reset();
            } else if (errorMessage.includes('Your account is not approved')) {
              setIsReviewDialogOpen(true);
              reset();
            } else {
              setError(!isUndefined(errorMessage) ? errorMessage : 'An error occurred during login');
              setToasterOpen(true);
            }
          }
        })
        .catch((error) => {
          setError('An unexpected error occurred' + error);
          setToasterOpen(true);
        });
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} className="login-form">
      <TextField
        {...register('email')}
        placeholder="Email"
        label="Email"
        type="text"
        error={!!errors.email}
        helperText={errors.email?.message}
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
            Forgotten your password?
          </Link>
        </Typography>
      </Box>
      <Button type="submit" disabled={isPending} fullWidth className="button button--white">
        {isPending ? en.helperText.loading : en.helperText.continue}
      </Button>
      <Typography className="signup-text">
        {en.helperText.noAccount}
        <Typography
          variant="body2"
          component="span"
          onClick={handleNavigation}
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
      </Typography>
      <Toaster open={toasterOpen} setOpen={setToasterOpen} message={error} severity="error" />
      <Backdrop sx={{ color: '#fff', zIndex: 100 }} open={isPending}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Dialog open={isReviewDialogOpen} fullScreen aria-labelledby="form-dialog-title">
        <ApplicationReviewDialog />
      </Dialog>
      <Dialog open={isRejectDialogOpen} fullScreen aria-labelledby="form-dialog-title">
        <ApplicationRejectedDialog />
      </Dialog>
    </Box>
  );
};

export default LoginForm;
