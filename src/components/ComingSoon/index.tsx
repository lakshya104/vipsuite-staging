'use client';
import React, { useEffect, useState, useTransition } from 'react';
import { Box, Typography, TextField, Button, Backdrop, CircularProgress } from '@mui/material';
import { useForm } from 'react-hook-form';
import { GetFormId, SubmitComingSoonForm } from '@/libs/api-manager/manager';
import UseToaster from '@/hooks/useToaster';
import Toaster from '../Toaster';
import './comingsoon.scss';

const ComingSoon = () => {
  const [unitTag, setUnitTag] = useState('');
  const [isPending, startTransition] = useTransition();
  const { toasterOpen, error, openToaster, closeToaster } = UseToaster();
  const [toasterType, setToasterType] = useState<'error' | 'success' | 'warning' | 'info'>('success');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    startTransition(() => {
      const fetchUnitTag = async () => {
        try {
          const response = await GetFormId();
          setUnitTag(response.formID);
        } catch (error) {
          setToasterType('error');
          openToaster('Failed to fetch Form ID');
          console.error('Error fetching ID:', error);
        }
      };
      fetchUnitTag();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    startTransition(async () => {
      try {
        const payload = new FormData();
        payload.append('email', data.email);
        payload.append('_wpcf7_unit_tag', unitTag);
        const res = await SubmitComingSoonForm(payload);
        setToasterType('info');
        openToaster(res.message ?? 'You have successfully submitted your email');
        reset();
      } catch (error) {
        setToasterType('error');
        openToaster((error as Error).toString() ?? 'Failed to submit form');
        console.error('Error fetching ID:', error);
      }
    });
  };

  return (
    <Box className="coming-soon__page">
      <Typography variant="h1" gutterBottom>
        The VIP Suite Coming soon
      </Typography>
      <Typography className="coming-soon__desc" gutterBottom variant="body1" align="center">
        If you would like to be the first to know
      </Typography>

      <Box className="coming-soon__form" component="form" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className="coming-soon__wrapper"
          {...register('email', {
            required: 'Email is required',
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email format' },
          })}
          variant="outlined"
          placeholder="Enter your email"
          type="email"
          fullWidth
          error={!!errors.email}
          helperText={errors.email?.message?.toString()}
        />
        <Button type="submit">Notify Me</Button>
      </Box>
      <Backdrop sx={{ color: '#fff', zIndex: 100 }} open={isPending}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Toaster open={toasterOpen} setOpen={closeToaster} message={error} severity={toasterType} />
    </Box>
  );
};

export default ComingSoon;
