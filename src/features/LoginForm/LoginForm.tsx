'use client';
import React, { useState, useTransition } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { login } from '@/libs/actions';
import InputForm from '@/components/InputForm/InputForm';
import { LoginFormValues, LoginSchema } from './loginTypes';
import './LoginForm.scss';
import Toaster from '@/components/Toaster';
import DialogBox from '@/components/Dialog/Dialog';
import Link from 'next/link';

const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string>('');
  const [toasterOpen, setToasterOpen] = useState<boolean>(false);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState<boolean>(false);

  const dialogBoxContent = {
    title: 'Thank You!',
    subTitle: 'Application in Review',
    description:
      'Thank you for your application. The concierge team will review your submission and will be in touch in due course with their decision.',
    buttonText: 'Done',
    isCrossIcon: true,
  };

  const handleDialogBoxDataChange = (open: boolean) => {
    setIsReviewDialogOpen(open);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    console.log({ values });
    setError('');
    startTransition(() => {
      login(values)
        .then((data) => {
          if (data && data.error && data.error !== 'Error: Your account is not approved') {
            setError(data?.error);
            setToasterOpen(true);
          } else if (data && data.error === 'Error: Your account is not approved') {
            setIsReviewDialogOpen(true);
          }
        })
        .catch((error) => {
          console.error('Error during login:', error);
          setError('An unexpected error occurred');
          setToasterOpen(true);
        });
    });
  };
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} className="login-form">
      <InputForm
        {...register('username')}
        placeholder="Username"
        type="text"
        error={!!errors.username}
        helperText={errors.username?.message}
        autoComplete="username"
      />
      <InputForm
        {...register('password')}
        placeholder="Password"
        type="password"
        error={!!errors.password}
        helperText={errors.password?.message}
        autoComplete="current-password"
      />
      <Button type="submit" disabled={isPending} fullWidth className="button button--white">
        {isPending ? 'Loading...' : 'Continue'}
      </Button>
      <Typography className="signup-text">
        Don&apos;t have an account?{' '}
        <Link
          href={'/onboarding'}
          style={{
            textDecoration: 'underline',
            padding: 0,
            margin: 0,
            color: 'white',
          }}
        >
          Apply here
        </Link>
      </Typography>
      <DialogBox
        isDialogOpen={isReviewDialogOpen}
        onDataChange={handleDialogBoxDataChange}
        content={dialogBoxContent}
      />
      <Toaster open={toasterOpen} setOpen={setToasterOpen} message={error} severity="error" />
    </Box>
  );
};

export default LoginForm;
