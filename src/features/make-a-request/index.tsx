'use client';
import Btn from '@/components/Button/CommonBtn';
import { InputTextAreaFormField } from '@/components/InputTextFormField';
import { zodResolver } from '@hookform/resolvers/zod';
import { Backdrop, Box, CircularProgress, Typography } from '@mui/material';
import React, { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import './MakeRequest.scss';
import UseToaster from '@/hooks/useToaster';
import Toaster from '@/components/Toaster';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  itemName: z
    .string()
    .min(1, 'This field is required')
    .min(15, 'Describe the item in at least 15 characters')
    .max(400, 'Describe the item in less than 400 characters'),
});

type FormValues = z.infer<typeof formSchema>;

const MakeRequest = () => {
  const router = useRouter();
  const [isPending, setIsPending] = useState<boolean>(false);
  const { toasterOpen, error, openToaster, closeToaster } = UseToaster();
  const [toasterType, setToasterType] = useState<string>('');
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      itemName: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    setIsPending(true);
    setToasterType('success');
    console.log('Form Submitted:', data);
    openToaster('Form Submitted', () => {
      router.push('/home');
    });
  };

  return (
    <Fragment>
      <Box className="bg-textBlack gray-card__details">
        <Box className="gray-card__details-inner">
          <Typography variant="h2" align="center">
            Make a Request
          </Typography>
          <Typography component="p" align="center">
            Have you got a party, special event, or work opportunity you would like a brand to get involved with? Submit
            your request here. Only if something suitable arises will we be in touch.
          </Typography>
          <form className="gray-card__form" onSubmit={handleSubmit(onSubmit)}>
            <Box>
              <InputTextAreaFormField
                name="itemName"
                control={control}
                placeholder="Enter your request ..."
                errors={errors}
              />
            </Box>
            <Btn look="dark-filled" className="button button--white" width="100%" type="submit">
              Submit Request
            </Btn>
          </form>
        </Box>
      </Box>
      <Backdrop sx={{ color: '#fff', zIndex: 100 }} open={isPending}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Toaster
        open={toasterOpen}
        setOpen={closeToaster}
        message={error}
        severity={toasterType as 'error' | 'success' | 'warning' | 'info'}
      />
    </Fragment>
  );
};

export default MakeRequest;
