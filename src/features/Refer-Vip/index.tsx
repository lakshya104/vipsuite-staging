'use client';
import React, { Fragment, useState } from 'react';
import { Backdrop, Box, Button, CircularProgress, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ReferVipSchema } from './types';
import { ReferVipFormFields } from '@/data';
import './ReferVip.scss';
import Toaster from '@/components/Toaster';
import UseToaster from '@/hooks/useToaster';
import { ReferaVIP } from '@/libs/api-manager/manager';
import en from '@/helpers/lang';
import InputTextFormField from '@/components/InputTextFormField';

type FormValues = z.infer<typeof ReferVipSchema>;

interface ReferVIPFormProps {
  description: string;
  closeDialog: () => void;
}

const ReferVIPForm: React.FC<ReferVIPFormProps> = ({ description, closeDialog }) => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const { toasterOpen, error, openToaster, closeToaster } = UseToaster();
  const [toasterType, setToasterType] = useState<'error' | 'success' | 'warning' | 'info'>('success');

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(ReferVipSchema),
    defaultValues: {
      email: '',
      instagram_handle: '',
      tiktok_handle: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setIsPending(true);
      const res = await ReferaVIP(data);
      setToasterType('success');
      openToaster(res?.message);
      setTimeout(() => {
        closeDialog();
      }, 1500);
    } catch (error) {
      setToasterType('error');
      openToaster(en.referVip.formError + error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Fragment>
      <Box component="main" className="bg-textBlack gray-card__details">
        <Box className="gray-card__details-inner">
          <Typography variant="h2" align="center">
            {en.referVip.title}
          </Typography>
          <Typography component="p" align="center">
            {description}
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} className="gray-card__form">
            {ReferVipFormFields.map((field) => (
              <Box key={field.name}>
                <InputTextFormField
                  errors={errors}
                  name={field.name as keyof FormValues}
                  noLabel={true}
                  placeholder={field.placeholder}
                  control={control}
                />
              </Box>
            ))}
            <Button type="submit" disabled={isPending} className="button button--white" fullWidth>
              {isPending ? en.referVip.submitting : en.referVip.continue}
            </Button>
          </Box>
        </Box>
      </Box>
      <Backdrop sx={{ zIndex: 100000 }} open={isPending}>
        <CircularProgress sx={{ color: 'white' }} />
      </Backdrop>
      <Toaster open={toasterOpen} setOpen={closeToaster} message={error} severity={toasterType} />
    </Fragment>
  );
};

export default ReferVIPForm;
