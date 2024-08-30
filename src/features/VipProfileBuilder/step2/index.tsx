'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Typography, TextField, Backdrop, CircularProgress } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormValues, vipStep2Schema } from './schema';
import { contacts } from '@/data';
import CustomStepper from '@/components/CustomStepper/CustomStepper';
import '../ProfileBuilder.scss';
import { ProfileBuilderStepsProps, ACF } from '@/interfaces';
import { UpdateProfile } from '@/libs/api-manager/manager';
import UseToaster from '@/hooks/useToaster';
import Toaster from '@/components/Toaster';

const Step2Form: React.FC<ProfileBuilderStepsProps> = ({ profileDetail, onNext, onPrev, token, id }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toasterOpen, error, openToaster, closeToaster } = UseToaster();

  const defaultValues: FormValues = {
    eventsEmail: profileDetail.event_contacts?.email || '',
    eventsSecondaryEmail: profileDetail.event_contacts?.secondary_email || '',
    stylistEmail: profileDetail.stylist_contacts?.email || '',
    stylistSecondaryEmail: profileDetail.stylist_contacts?.secondary_email || '',
    giftingEmail: profileDetail.gifting_contacts?.email || '',
    giftingSecondaryEmail: profileDetail.gifting_contacts?.secondary_email || '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(vipStep2Schema),
    defaultValues: defaultValues,
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      const updatedProfileDetail: ACF = {
        ...profileDetail,
        event_contacts: {
          email: data.eventsEmail || '',
          secondary_email: data.eventsSecondaryEmail || '',
        },
        stylist_contacts: {
          email: data.stylistEmail || '',
          secondary_email: data.stylistSecondaryEmail || '',
        },
        gifting_contacts: {
          email: data.giftingEmail || '',
          secondary_email: data.giftingSecondaryEmail || '',
        },
      };
      const profile = {
        acf: {
          first_name: profileDetail.first_name,
          last_name: profileDetail.last_name,
          event_contacts: {
            email: data.eventsEmail || '',
            secondary_email: data.eventsSecondaryEmail || '',
          },
          stylist_contacts: {
            email: data.stylistEmail || '',
            secondary_email: data.stylistSecondaryEmail || '',
          },
          gifting_contacts: {
            email: data.giftingEmail || '',
            secondary_email: data.giftingSecondaryEmail || '',
          },
        },
      };
      await UpdateProfile(id, token, profile);
      onNext(updatedProfileDetail);
    } catch (error) {
      openToaster('Error during profile update. ' + error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} className="profile-builder__form">
      <Box className="profile-builder__head">
        <Typography variant="h2" textAlign="center">
          Additional Contacts
        </Typography>
      </Box>
      {contacts.map(({ section, description }) => (
        <Box className="profile-builder__form-row" key={section}>
          <Typography variant="h3" gutterBottom>
            {section}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {description}
          </Typography>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            {...register(`${section.toLowerCase()}Email` as keyof FormValues)}
            error={!!errors[`${section.toLowerCase()}Email` as keyof FormValues]}
            helperText={errors[`${section.toLowerCase()}Email` as keyof FormValues]?.message}
          />
          <TextField
            fullWidth
            label="Secondary Email"
            variant="outlined"
            margin="normal"
            {...register(`${section.toLowerCase()}SecondaryEmail` as keyof FormValues)}
            error={!!errors[`${section.toLowerCase()}SecondaryEmail` as keyof FormValues]}
            helperText={errors[`${section.toLowerCase()}SecondaryEmail` as keyof FormValues]?.message}
          />
        </Box>
      ))}
      <CustomStepper currentStep={2} totalSteps={5} onPrev={onPrev} />
      <Backdrop sx={{ color: '#fff', zIndex: 100 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Toaster open={toasterOpen} setOpen={closeToaster} message={error} severity="error" />
    </Box>
  );
};

export default Step2Form;
