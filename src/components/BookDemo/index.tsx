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
} from '@mui/material';
import './book-a-demo.scss';
import { BookDemoFormFields } from '@/data';
import { Controller, useForm } from 'react-hook-form';
import InputForm from '../InputForm/InputForm';
import { BookDemoSchema, defaultValues } from './bookDemoTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import { GetFormId, SubmitLandingPageForm } from '@/libs/api-manager/manager';
import UseToaster from '@/hooks/useToaster';
import { ContentModule } from '@/interfaces/public-page';
import Toaster from '../Toaster';
import en from '@/helpers/lang';

interface BookDemoProps {
  data: ContentModule;
}

const BookDemo: React.FC<BookDemoProps> = ({ data }) => {
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
    resolver: zodResolver(BookDemoSchema),
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
          const response = await GetFormId('book_demo_form_id');
          setUnitTag(response?.book_demo_form_id);
        } catch (error) {
          setToasterType('error');
          openToaster(en.landingPage.bookDemo.failedFormId);
          console.error(en.landingPage.bookDemo.fetchId, error);
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
        const res = await SubmitLandingPageForm(unitTag, payload);
        setToasterType('info');
        openToaster(res.message ?? en.landingPage.bookDemo.successFormSubmit);
        reset();
        setValue('role', '');
        setSelectValue('');
      } catch (error) {
        openToaster((error as Error).toString() ?? en.landingPage.bookDemo.failedFormSubmit);
        console.error(en.landingPage.bookDemo.fetchId, error);
      }
    });
  };

  return (
    <Box component="main" className="site-main demo-signup">
      <Container>
        <Typography className="page-title" variant="body1" align="center">
          {data?.copy}
        </Typography>
        <Box component="form" className="signup-form" onSubmit={handleSubmit(onSubmit)}>
          {BookDemoFormFields.map(({ name, label, placeholder, autocomplete, type }) => (
            <Box key={name} className="signup__item">
              <Controller
                name={name as 'name' | 'email' | 'company' | 'jobTitle' | 'role'}
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
                        <MenuItem value="Brand">{en.landingPage.bookDemo.menuItems.brand}</MenuItem>
                        <MenuItem value="VIP">{en.landingPage.bookDemo.menuItems.vip}</MenuItem>
                        <MenuItem value="Agent">{en.landingPage.bookDemo.menuItems.agent}</MenuItem>
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
            {en.landingPage.bookDemo.submit}
          </Button>
        </Box>
      </Container>
      <Backdrop sx={{ color: '#fff', zIndex: 100 }} open={isPending}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Toaster open={toasterOpen} setOpen={closeToaster} message={error} severity={toasterType} />
    </Box>
  );
};

export default BookDemo;
