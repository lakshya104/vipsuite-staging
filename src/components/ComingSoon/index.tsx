'use client';
import React, { useState, useTransition } from 'react';
import { Box, Typography, TextField, Button, Backdrop, CircularProgress } from '@mui/material';
import { useForm } from 'react-hook-form';
import { SubmitLandingPageForm } from '@/libs/api-manager/manager';
import UseToaster from '@/hooks/useToaster';
import Toaster from '../Toaster';
import './comingsoon.scss';
import { ComingSoonData } from '@/interfaces/public-page';
import en from '@/helpers/lang';
import ShowHtml from '../ShowHtml';

interface ComingSoonProps {
  comingSoondata: ComingSoonData;
}

interface FormData {
  email: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({ comingSoondata }) => {
  const [isPending, startTransition] = useTransition();
  const { toasterOpen, error, openToaster, closeToaster } = UseToaster();
  const [toasterType, setToasterType] = useState<'error' | 'success' | 'warning' | 'info'>('success');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    startTransition(async () => {
      try {
        const payload = new FormData();
        payload.append('email', data.email);
        payload.append('_wpcf7_unit_tag', comingSoondata?.notification_form_id);
        const res = await SubmitLandingPageForm(comingSoondata?.notification_form_id, payload);
        setToasterType('info');
        openToaster(res.message || en.landingPage.comingSoon.successFormSubmit);
        reset();
      } catch (error) {
        setToasterType('error');
        openToaster((error as Error).toString() || en.landingPage.comingSoon.failedFormSubmit);
        console.error(en.landingPage.comingSoon.fetchId, error);
      }
    });
  };

  return (
    <Box className="coming-soon__page">
      {comingSoondata?.title && (
        <Typography variant="h1" gutterBottom>
          {comingSoondata?.title}
        </Typography>
      )}
      {comingSoondata?.description && (
        <Box className="coming-soon__desc">
          <ShowHtml text={comingSoondata?.description} />
        </Box>
      )}
      <Box className="coming-soon__form" component="form" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className="coming-soon__wrapper"
          {...register('email', {
            required: 'Email is required',
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email format' },
          })}
          variant="outlined"
          placeholder={comingSoondata?.placeholder_text || en.landingPage.comingSoon.placeholder}
          type="text"
          fullWidth
          error={!!errors.email}
          helperText={errors.email?.message?.toString()}
        />
        <Button type="submit">{comingSoondata?.cta_button_text || en.landingPage.comingSoon.notify}</Button>
      </Box>
      <Backdrop sx={{ color: '#fff', zIndex: 100 }} open={isPending}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Toaster open={toasterOpen} setOpen={closeToaster} message={error} severity={toasterType} />
    </Box>
  );
};

export default ComingSoon;
