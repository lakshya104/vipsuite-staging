'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Typography,
  TextField,
  Backdrop,
  CircularProgress,
  Checkbox,
  FormControlLabel,
  FormControl,
  FormHelperText,
} from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormValues, vipStep2Schema } from './schema';
import { contacts } from '@/data';
import CustomStepper from '@/components/CustomStepper/CustomStepper';
import '../ProfileBuilder.scss';
import { ProfileBuilderStepsProps, ACF } from '@/interfaces';
import { UpdateProfile } from '@/libs/api-manager/manager';
import UseToaster from '@/hooks/useToaster';
import Toaster from '@/components/Toaster';

const Step2Form: React.FC<ProfileBuilderStepsProps> = ({ profileDetail, onNext, onPrev, id, isAgent }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toasterOpen, error, openToaster, closeToaster } = UseToaster();

  const defaultValues: FormValues = {
    eventsEmail: profileDetail.event_contacts?.email || '',
    eventsSecondaryEmail: profileDetail.event_contacts?.secondary_email || '',
    eventsContactMeDirectly: profileDetail.event_contacts?.contact_me_directly ?? true,
    stylistEmail: profileDetail.stylist_contacts?.email || '',
    stylistSecondaryEmail: profileDetail.stylist_contacts?.secondary_email || '',
    stylistContactMeDirectly: profileDetail.stylist_contacts?.contact_me_directly ?? true,
    commercialOpportunitiesEmail: profileDetail.commercial_opportunities_contacts?.email || '',
    commercialOpportunitiesSecondaryEmail: profileDetail.commercial_opportunities_contacts?.secondary_email || '',
    commercialOpportunitiesContactMeDirectly:
      profileDetail.commercial_opportunities_contacts?.contact_me_directly ?? true,
  };

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
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
    commercialOpportunitiesEmail: false,
    commercialOpportunitiesSecondaryEmail: false,
    commercialOpportunitiesContactMeDirectly: defaultValues.commercialOpportunitiesContactMeDirectly,
  });

  const handleCheckboxChange = (section: keyof FormValues) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setCheckboxStates((prevState) => ({
      ...prevState,
      [section]: checked,
    }));
    setValue(section, checked);
    if (checked) {
      clearErrors(section);
      const emailKey = section.replace('ContactMeDirectly', 'Email') as keyof FormValues;
      const secondaryEmailKey = section.replace('ContactMeDirectly', 'SecondaryEmail') as keyof FormValues;
      clearErrors([emailKey, secondaryEmailKey]);
      setValue(emailKey, '');
      setValue(secondaryEmailKey, '');
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
        commercial_opportunities_contacts: {
          email: data.commercialOpportunitiesEmail || '',
          secondary_email: data.commercialOpportunitiesSecondaryEmail || '',
          contact_me_directly: data.commercialOpportunitiesContactMeDirectly || false,
        },
      };

      const profile = {
        acf: {
          first_name: profileDetail.first_name,
          last_name: profileDetail.last_name,
          event_contacts: updatedProfileDetail.event_contacts,
          stylist_contacts: updatedProfileDetail.stylist_contacts,
          commercial_opportunities_contacts: updatedProfileDetail.commercial_opportunities_contacts,
        },
      };
      await UpdateProfile(id, profile);
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
      {contacts.map(({ section, description, name }) => (
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
            {...register(`${name}Email` as keyof FormValues)}
            error={!!errors[`${name}Email` as keyof FormValues]}
            helperText={errors[`${name}Email` as keyof FormValues]?.message}
            disabled={checkboxStates[`${name}ContactMeDirectly` as keyof FormValues]}
            InputLabelProps={{
              shrink: !checkboxStates[`${name}ContactMeDirectly` as keyof FormValues],
            }}
          />
          <TextField
            fullWidth
            label="Secondary Email"
            variant="outlined"
            margin="normal"
            {...register(`${name}SecondaryEmail` as keyof FormValues)}
            error={!!errors[`${name}SecondaryEmail` as keyof FormValues]}
            helperText={errors[`${name}SecondaryEmail` as keyof FormValues]?.message}
            disabled={checkboxStates[`${name}ContactMeDirectly` as keyof FormValues]}
            InputLabelProps={{
              shrink: !checkboxStates[`${name}ContactMeDirectly` as keyof FormValues],
            }}
          />
          <FormControl error={!!errors[`${name}ContactMeDirectly` as keyof FormValues]}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkboxStates[`${name}ContactMeDirectly` as keyof FormValues]}
                  onChange={handleCheckboxChange(`${name}ContactMeDirectly` as keyof FormValues)}
                  color="primary"
                />
              }
              label="Contact me directly"
            />
            {errors[`${name}ContactMeDirectly` as keyof FormValues] && (
              <FormHelperText>{errors[`${name}ContactMeDirectly` as keyof FormValues]?.message}</FormHelperText>
            )}
          </FormControl>
        </Box>
      ))}
      <CustomStepper currentStep={isAgent ? 3 : 2} totalSteps={isAgent ? 6 : 5} onPrev={onPrev} />
      <Backdrop sx={{ color: '#fff', zIndex: 100 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Toaster open={toasterOpen} setOpen={closeToaster} message={error} severity="error" />
    </Box>
  );
};

export default Step2Form;
