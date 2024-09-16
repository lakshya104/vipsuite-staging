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
import { DashboardContent } from '@/interfaces/brand';
import { ReferaVIP } from '@/libs/api-manager/manager';
import { useCurrentUser } from '@/hooks/useCurrentUser';

// Define FormValues type based on Zod schema
type FormValues = z.infer<typeof ReferVipSchema>;

// Define the props interface for the component
interface ReferVIPFormProps {
  dashboardContent: DashboardContent;
}

const ReferVIPForm: React.FC<ReferVIPFormProps> = ({ dashboardContent }) => {
  const router = useRouter();
  const user = useCurrentUser();
  const [isPending, setIsPending] = useState<boolean>(false);
  const { toasterOpen, error, openToaster, closeToaster } = UseToaster();
  const [toasterType, setToasterType] = useState<'error' | 'success' | 'warning' | 'info'>('success');

  // Set up form handling with React Hook Form and Zod validation
  const {
    register,
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

  // Function called on form submission
  const onSubmit = async (data: FormValues) => {
    try {
      setIsPending(true);
      await ReferaVIP(user?.vip_profile_id, user?.token, data);
      setToasterType('success');
      openToaster('Referral submitted successfully');
      router.push('/home');
    } catch (error) {
      setToasterType('error');
      openToaster('Error during submit the form. ' + error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Fragment>
      <Box component="main" className="bg-textBlack gray-card__details">
        <Box className="gray-card__details-inner">
          <Typography variant="h2" align="center">
            Refer a VIP
          </Typography>
          <Typography component="p" align="center">
            {dashboardContent.rafer_vip_description}
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
      <Backdrop sx={{ zIndex: 100 }} open={isPending}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Toaster open={toasterOpen} setOpen={closeToaster} message={error} severity={toasterType} />
    </Fragment>
  );
};

export default ReferVIPForm;
