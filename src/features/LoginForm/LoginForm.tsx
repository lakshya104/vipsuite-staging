'use client';
import * as React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { login } from '@/libs/actions';
import InputForm from '@/components/InputForm/InputForm';
import { LoginFormValues, LoginSchema } from './loginTypes';
import VIPSuiteDialog from '@/components/VIPSuiteDialog';
import './LoginForm.scss';
import Toaster from '@/components/Toaster';

const LoginForm = () => {
  const [isPending, startTransition] = React.useTransition();
  const [error, setError] = React.useState('');
  const [isDialogopen, setIsDialogOpen] = React.useState(false);
  const [toasterOpen, setToasterOpen] = React.useState(false);
  const DialogBtns = [
    { href: '/signup/vip', text: 'Apply as VIP' },
    { href: '/signup/agent', text: 'Apply as Agent' },
    { href: '/signup/brand', text: 'Apply as Brand' },
  ];

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
      login(values).then((data) => {
        if (data && data.error) {
          setError(data?.error);
          setToasterOpen(true);
        }
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
        <Button
          color="inherit"
          sx={{
            textTransform: 'capitalize',
            textDecoration: 'underline',
            p: 0,
            m: 0,
            '&:focus': {
              outline: 'none',
            },
          }}
          onClick={() => setIsDialogOpen(true)}
        >
          Apply here
        </Button>
        <VIPSuiteDialog
          isOpen={isDialogopen}
          onClose={() => setIsDialogOpen(false)}
          withLogo={false}
          buttonsArray={DialogBtns}
        />
      </Typography>
      <Toaster open={toasterOpen} setOpen={setToasterOpen} message={error} severity="error" />
    </Box>
  );
};

export default LoginForm;
