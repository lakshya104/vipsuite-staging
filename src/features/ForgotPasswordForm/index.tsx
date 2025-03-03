'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Backdrop, Box, Button, CircularProgress, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import InputForm from '@/components/InputForm/InputForm';
import Toaster from '@/components/Toaster';
import DialogBox from '@/components/Dialog';
import './ForgotPasswordForm.scss';
import { ForgotPassword } from '@/libs/api-manager/manager';
import UseToaster from '@/hooks/useToaster';
import { requiredEmailValidation } from '@/helpers/validations';
import en from '@/helpers/lang';
import { paths } from '@/helpers/paths';

interface ForgotPasswordFormProps {
  // eslint-disable-next-line no-unused-vars
  handleStepChange: (step: number) => void;
  // eslint-disable-next-line no-unused-vars
  handleUserMailChange: (mail: string) => void;
}
const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ handleStepChange, handleUserMailChange }) => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const { toasterOpen, error, openToaster, closeToaster } = UseToaster();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const dialogBoxContent = {
    title: en.login.forgotPassword.dialogTitle,
    subTitle: en.login.forgotPassword.subTitle,
    description: en.login.forgotPassword.description,
    buttonText: en.login.forgotPassword.done,
    isCrossIcon: true,
  };

  const handleDialogBoxDataChange = (open: boolean) => {
    setIsDialogOpen(open);
    setIsPending(true);
    handleStepChange(2);
  };

  const ForgotPasswordSchema = z.object({
    email: requiredEmailValidation,
  });

  type ForgotPasswordFormValues = z.infer<typeof ForgotPasswordSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    setIsPending(true);
    try {
      const data = { email: values.email };
      handleUserMailChange(values.email);
      await ForgotPassword(data);
      setIsPending(false);
      setIsDialogOpen(true);
      reset();
    } catch (error) {
      openToaster(String(error));
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} className="forgot-password-form">
      <InputForm
        {...register('email')}
        placeholder="Email"
        label="Email"
        type="email"
        error={!!errors.email}
        helperText={errors.email?.message}
        autoComplete="email"
      />
      <Button type="submit" disabled={isPending} fullWidth className="button button--white">
        {isPending ? en.login.forgotPassword.sending : en.login.forgotPassword.sendBtn}
      </Button>
      <Typography className="signup-text">
        {en.helperText.noAccount}{' '}
        <Link
          href={paths.auth.onBoarding.getHref()}
          style={{
            textDecoration: 'underline',
            padding: 0,
            margin: 0,
            color: 'white',
          }}
        >
          {en.helperText.applyHere}
        </Link>
      </Typography>
      <DialogBox isDialogOpen={isDialogOpen} onDataChange={handleDialogBoxDataChange} content={dialogBoxContent} />
      <Backdrop sx={{ color: '#fff', zIndex: 100 }} open={isPending}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Toaster open={toasterOpen} setOpen={closeToaster} message={error} severity="error" />
    </Box>
  );
};

export default ForgotPasswordForm;
