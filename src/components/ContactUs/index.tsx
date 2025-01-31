'use client';
import React, { useEffect, useState, useTransition } from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  MenuItem,
  Select,
  FormHelperText,
  FormControl,
  Backdrop,
  CircularProgress,
  Grid2,
} from '@mui/material';
import './contact-us.scss';
import { ContactUsFormFields } from '@/data';
import { Controller, useForm } from 'react-hook-form';
import InputForm from '../InputForm/InputForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { GetFormId, SubmitLandingPageForm } from '@/libs/api-manager/manager';
import UseToaster from '@/hooks/useToaster';
import { ContentModule } from '@/interfaces/public-page';
import Toaster from '../Toaster';
import { ContactUsSchema, defaultValues } from './contatcFormTypes';
import en from '@/helpers/lang';

interface ContactUsProps {
  data: ContentModule;
}

const ContactUs: React.FC<ContactUsProps> = ({ data }) => {
  const [unitTag, setUnitTag] = useState('');
  const [isPending, startTransition] = useTransition();
  const { toasterOpen, error, openToaster, closeToaster } = UseToaster();
  const [toasterType, setToasterType] = useState<'error' | 'success' | 'warning' | 'info'>('success');
  const [value, setSelectValue] = useState('');

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm({
    resolver: zodResolver(ContactUsSchema),
    defaultValues: defaultValues,
  });

  const handleChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setSelectValue(event.target.value);
    setValue('role', event.target.value as string);
    clearErrors('role');
  };

  useEffect(() => {
    startTransition(() => {
      const fetchUnitTag = async () => {
        try {
          const response = await GetFormId('contact_form_id');
          setUnitTag(response?.contact_form_id);
        } catch (error) {
          setToasterType('error');
          openToaster(en.landingPage.contactUs.failedFormId);
          console.error(en.landingPage.contactUs.fetchId, error);
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
        payload.append('_wpcf7_unit_tag', unitTag);
        payload.append('contact-as', data.role);
        payload.append('name', data.name);
        payload.append('email', data.email);
        payload.append('job-title', data.jobTitle);
        payload.append('company', data.company);
        payload.append('phone', data.phone);
        const res = await SubmitLandingPageForm(unitTag, payload);
        setToasterType('info');
        openToaster(res.message ?? en.landingPage.contactUs.successFormSubmit);
        reset();
        setValue('role', '');
        setSelectValue('');
      } catch (error) {
        openToaster((error as Error).toString() ?? en.landingPage.contactUs.failedFormSubmit);
        console.error(en.landingPage.contactUs.fetchId, error);
      }
    });
  };

  return (
    <Box component="main" className="site-main demo-signup contact-form">
      <Container>
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Typography className="contact-form__title" variant="h2" gutterBottom>
              {data?.heading}
            </Typography>
            <Typography className="page-title" variant="body1">
              {data?.copy}
            </Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Box component="form" className="signup-form" onSubmit={handleSubmit(onSubmit)}>
              {ContactUsFormFields.map(({ name, label, placeholder, autocomplete, type }) => (
                <Box key={name} className="signup__item">
                  <Controller
                    name={name as 'name' | 'email' | 'company' | 'jobTitle' | 'role' | 'phone'}
                    control={control}
                    render={({ field }) =>
                      type === 'select' ? (
                        <FormControl fullWidth error={!!errors[name as keyof typeof errors]}>
                          <Select
                            value={value}
                            onChange={handleChange}
                            displayEmpty
                            renderValue={(selected) =>
                              selected === '' ? <span className="custom-placeholder">{placeholder}</span> : selected
                            }
                          >
                            <MenuItem value="" disabled>
                              <span className="custom-placeholder">{placeholder}</span>
                            </MenuItem>
                            <MenuItem value="Brand">{en.landingPage.contactUs.menuItems.brand}</MenuItem>
                            <MenuItem value="VIP">{en.landingPage.contactUs.menuItems.vip}</MenuItem>
                            <MenuItem value="Agent">{en.landingPage.contactUs.menuItems.agent}</MenuItem>
                          </Select>
                          <FormHelperText>{errors[name as keyof typeof errors]?.message}</FormHelperText>
                        </FormControl>
                      ) : (
                        <InputForm
                          {...field}
                          placeholder={placeholder}
                          value={field.value}
                          autoFill={true}
                          label={label}
                          type={type}
                          error={!!errors[name as keyof typeof errors]}
                          helperText={errors[name as keyof typeof errors]?.message}
                          autoComplete={autocomplete}
                        />
                      )
                    }
                  />
                </Box>
              ))}
              <Button type="submit" className="button button--white" fullWidth>
                {en.landingPage.contactUs.submit}
              </Button>
            </Box>
          </Grid2>
        </Grid2>
      </Container>

      <Backdrop sx={{ color: '#fff', zIndex: 100 }} open={isPending}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Toaster open={toasterOpen} setOpen={closeToaster} message={error} severity={toasterType} />
    </Box>
  );
};

export default ContactUs;
