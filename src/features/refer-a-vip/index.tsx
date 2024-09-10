'use client';
import React, { Fragment, useState } from 'react';
import { Backdrop, Box, Button, CircularProgress, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import InputForm from '@/components/InputForm/InputForm';
import { ReferVipSchema } from './types';
import { ReferVipFormFields } from '@/data';
import './ReferVip.scss';
import { useRouter } from 'next/navigation';
import Toaster from '@/components/Toaster';
import UseToaster from '@/hooks/useToaster';

type FormValues = z.infer<typeof ReferVipSchema>;

export default function ReferVIPForm() {
  const router = useRouter();
  const [isPending, setIsPending] = useState<boolean>(false);
  const { toasterOpen, error, openToaster, closeToaster } = UseToaster();
  const [toasterType, setToasterType] = useState<string>('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(ReferVipSchema),
    defaultValues: {
      email: '',
      instagram_profile: '',
      tiktok_profile: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    setIsPending(true);
    setToasterType('success');
    console.log('Form Submitted:', data);
    openToaster('Form Submitted', () => {
      router.push('/home');
    });
  };

  return (
    <Fragment>
      <Box component="main" className="bg-textBlack gray-card__details">
        <Box className="gray-card__details-inner">
          <Typography variant="h2" align="center">
            Refer a VIP
          </Typography>
          <Typography component="p" align="center">
            Lorem ipsum dolor sit amet, sed in posse primis, ius te putant molestie sapientem.
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} className="gray-card__form">
            {ReferVipFormFields.map((field) => (
              <Box key={field.name}>
                <InputForm
                  label={field.label}
                  placeholder={field.placeholder}
                  type={field.type}
                  autoComplete={field.autocomplete}
                  {...register(field.name as keyof FormValues)}
                  error={Boolean(errors[field.name as keyof FormValues])}
                  helperText={errors[field.name as keyof FormValues]?.message}
                />
              </Box>
            ))}
            <Button type="submit" className="button button--white" fullWidth>
              Continue
            </Button>
          </Box>
        </Box>
      </Box>
      <Backdrop sx={{ color: '#fff', zIndex: 100 }} open={isPending}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Toaster
        open={toasterOpen}
        setOpen={closeToaster}
        message={error}
        severity={toasterType as 'error' | 'success' | 'warning' | 'info'}
      />
    </Fragment>
  );
}
