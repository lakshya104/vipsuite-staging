'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Typography, TextField, Checkbox, FormControlLabel, FormControl, FormHelperText } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormValues, additionalContactsFormSchema } from './schema';
import './ProfileBuilder.scss';
import { ACF, AdditionalContactContent } from '@/interfaces';
import { UpdateProfile } from '@/libs/api-manager/manager';
import en from '@/helpers/lang';
import DynamicCustomStepper from '@/components/CustomStepper/DynamicCustomStepper';

interface AdditionalContactsProps {
  profileDetail: ACF;
  // eslint-disable-next-line no-unused-vars
  onNext: (profileDetail: ACF) => void;
  id: number;
  nextSectionNumber: () => void;
  prevSectionNumber: () => void;
  sectionNumber: number;
  totalSteps: number;
  // eslint-disable-next-line no-unused-vars
  handleLoading: (bool: boolean) => void;
  // eslint-disable-next-line no-unused-vars
  openToaster: (message?: string, onClose?: () => void) => void;
  sectionDetails: {
    additionalContactContent: AdditionalContactContent;
    sectionTitle: string;
    sectionDescription?: string;
  };
}

const AdditionalContactsForm: React.FC<AdditionalContactsProps> = ({
  profileDetail,
  onNext,
  id,
  sectionNumber,
  nextSectionNumber,
  prevSectionNumber,
  totalSteps,
  handleLoading,
  openToaster,
  sectionDetails,
}) => {
  const defaultValues: FormValues = {
    eventsEmail: profileDetail.event_contacts?.email || '',
    eventsSecondaryEmail: profileDetail.event_contacts?.secondary_email || '',
    eventsContactMeDirectly: profileDetail.event_contacts?.contact_me_directly ?? true,
    stylistEmail: profileDetail.stylist_contacts?.email || '',
    stylistSecondaryEmail: profileDetail.stylist_contacts?.secondary_email || '',
    stylistContactMeDirectly: profileDetail.stylist_contacts?.contact_me_directly ?? true,
    commercialOpportunitiesContactMeDirectly: true,
  };
  const { additionalContactContent, sectionTitle, sectionDescription } = sectionDetails;
  const contacts = [
    {
      section: additionalContactContent?.events_field_label,
      name: 'events',
      description: additionalContactContent?.events_field_description,
    },
    {
      section: additionalContactContent?.stylist_field_label,
      name: 'stylist',
      description: additionalContactContent?.stylist_field_description,
    },
  ];

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(additionalContactsFormSchema),
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
    handleLoading(true);
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
      if (sectionNumber < totalSteps - 1) {
        nextSectionNumber();
        handleLoading(false);
      }
    } catch (error) {
      openToaster(en.profileBuilder.steps.profileError + error);
    } finally {
      handleLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} className="profile-builder__form">
      <Box className="profile-builder__head">
        <Typography variant="h2" textAlign="center">
          {sectionTitle}
        </Typography>
        {sectionDescription && (
          <Typography variant="body1" textAlign="center">
            {sectionDescription}
          </Typography>
        )}
      </Box>
      {contacts.map(({ section, description, name }) => (
        <Box className="profile-builder__form-row" key={section}>
          <Typography variant="h3" gutterBottom>
            {section}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {description}
          </Typography>
          {!checkboxStates[`${name}ContactMeDirectly` as keyof FormValues] && (
            <>
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
            </>
          )}
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
      <DynamicCustomStepper
        handleSectionChange={prevSectionNumber}
        sectionNumber={sectionNumber}
        totalSteps={totalSteps}
      />
    </Box>
  );
};

export default AdditionalContactsForm;
