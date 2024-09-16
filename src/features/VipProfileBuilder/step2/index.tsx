'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Typography, TextField, Backdrop, CircularProgress, Checkbox, FormControlLabel } from '@mui/material';
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

  // Default values for the form
  const defaultValues: FormValues = {
    eventsEmail: profileDetail.event_contacts?.email || '',
    eventsSecondaryEmail: profileDetail.event_contacts?.secondary_email || '',
    eventsContactMeDirectly: profileDetail.event_contacts?.contact_me_directly ?? true,
    stylistEmail: profileDetail.stylist_contacts?.email || '',
    stylistSecondaryEmail: profileDetail.stylist_contacts?.secondary_email || '',
    stylistContactMeDirectly: profileDetail.stylist_contacts?.contact_me_directly ?? true,
    giftingEmail: profileDetail.gifting_contacts?.email || '',
    giftingSecondaryEmail: profileDetail.gifting_contacts?.secondary_email || '',
    giftingContactMeDirectly: profileDetail.gifting_contacts?.contact_me_directly ?? true,
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(vipStep2Schema),
    defaultValues: defaultValues,
  });

  // Managing checkbox states
  const [checkboxStates, setCheckboxStates] = useState<Record<keyof FormValues, boolean>>({
    eventsEmail: false,
    eventsSecondaryEmail: false,
    eventsContactMeDirectly: defaultValues.eventsContactMeDirectly,
    stylistEmail: false,
    stylistSecondaryEmail: false,
    stylistContactMeDirectly: defaultValues.stylistContactMeDirectly,
    giftingEmail: false,
    giftingSecondaryEmail: false,
    giftingContactMeDirectly: defaultValues.giftingContactMeDirectly,
  });

  const handleCheckboxChange = (section: keyof FormValues) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setCheckboxStates((prevState) => ({
      ...prevState,
      [section]: checked,
    }));
    setValue(section, checked);
    if (checked) {
      setValue(section.replace('ContactMeDirectly', 'Email') as keyof FormValues, '');
      setValue(section.replace('ContactMeDirectly', 'SecondaryEmail') as keyof FormValues, '');
    }
  };

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      const updatedProfileDetail: ACF = {
        ...profileDetail,
        event_contacts: {
          email: data.eventsEmail || '',
          secondary_email: data.eventsSecondaryEmail || '',
          contact_me_directly: data.eventsContactMeDirectly || false,
        },
        stylist_contacts: {
          email: data.stylistEmail || '',
          secondary_email: data.stylistSecondaryEmail || '',
          contact_me_directly: data.stylistContactMeDirectly || false,
        },
        gifting_contacts: {
          email: data.giftingEmail || '',
          secondary_email: data.giftingSecondaryEmail || '',
          contact_me_directly: data.giftingContactMeDirectly || false,
        },
      };

      const profile = {
        acf: {
          first_name: profileDetail.first_name,
          last_name: profileDetail.last_name,
          event_contacts: updatedProfileDetail.event_contacts,
          stylist_contacts: updatedProfileDetail.stylist_contacts,
          gifting_contacts: updatedProfileDetail.gifting_contacts,
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
            {section === 'Gifting' ? 'Commercial Opportunities' : section}
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
            disabled={checkboxStates[`${section.toLowerCase()}ContactMeDirectly` as keyof FormValues]}
          />
          <TextField
            fullWidth
            label="Secondary Email"
            variant="outlined"
            margin="normal"
            {...register(`${section.toLowerCase()}SecondaryEmail` as keyof FormValues)}
            error={!!errors[`${section.toLowerCase()}SecondaryEmail` as keyof FormValues]}
            helperText={errors[`${section.toLowerCase()}SecondaryEmail` as keyof FormValues]?.message}
            disabled={checkboxStates[`${section.toLowerCase()}ContactMeDirectly` as keyof FormValues]}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={checkboxStates[`${section.toLowerCase()}ContactMeDirectly` as keyof FormValues]}
                onChange={handleCheckboxChange(`${section.toLowerCase()}ContactMeDirectly` as keyof FormValues)}
                color="primary"
              />
            }
            label="Contact me directly"
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
