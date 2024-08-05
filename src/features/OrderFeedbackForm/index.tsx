'use client';

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Container, Typography } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Btn from '@/components/Button/CommonBtn';
import * as z from 'zod';
import InputTextFormField from '@/components/InputTextFormField';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export const orderFeedbackSchema = z.object({
  socialPostUrl: z.string().url('Url is required'),
  screenshot: z
    .custom<File>((val) => val instanceof File || !val)
    .refine((val) => val instanceof File, {
      message: 'Screenshot is required',
    }),
});

export type OrderFeedbackFormValues = z.infer<typeof orderFeedbackSchema>;

export const defaultValues: OrderFeedbackFormValues = {
  socialPostUrl: '',
  screenshot: undefined as unknown as File,
};

const OrderFeedbackForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderFeedbackFormValues>({
    resolver: zodResolver(orderFeedbackSchema),
    defaultValues,
  });
  const [fileName, setFileName] = useState<string | null>(null);
  const [btnDisable, setBtnDisable] = useState<boolean>(false);

  const onSubmit = (data: OrderFeedbackFormValues) => {
    setBtnDisable(true);
    setFileName('');
    console.log('Form data:', data);
    // Handle form submission
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Container maxWidth="lg" sx={{ mt: 2 }}>
        <Typography sx={{ fontSize: { xs: '16px', md: '20px' }, fontWeight: '500', marginBottom: '10px' }}>
          Feedback
        </Typography>
        <Typography sx={{ fontSize: { xs: '13px', md: '18px', marginBottom: '8px' }, fontWeight: '500' }}>
          URL of the related social post
        </Typography>
        <InputTextFormField
          name="socialPostUrl"
          control={control}
          placeholder="https://instagram.com/postID"
          errors={errors}
        />
        <Typography sx={{ fontSize: { xs: '13px', md: '18px', marginBottom: '8px' }, fontWeight: '500' }}>
          Upload a screenshot of your post
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Controller
            name="screenshot"
            control={control}
            // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
            render={({ field: { onChange, value, ...field } }) => (
              <Button
                sx={{
                  color: 'black',
                  minWidth: '300px',
                  width: '100%',
                  minHeight: '150px',
                  border: '1px solid #D1D1CB',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}
                component="label"
                startIcon={!fileName && <UploadFileIcon />}
                {...field}
              >
                {fileName ? (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      m: 2,
                      flexDirection: 'column',
                    }}
                  >
                    <CheckCircleOutlineIcon color="success" sx={{ mr: 1 }} />
                    <Typography
                      textAlign="center"
                      sx={{ fontSize: { xs: '13px', md: '18px', marginBottom: '8px' }, fontWeight: '500' }}
                    >
                      {fileName}
                    </Typography>
                  </Box>
                ) : (
                  'Upload a file'
                )}
                <input
                  type="file"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      onChange(file);
                      setFileName(file.name);
                    }
                  }}
                />
              </Button>
            )}
          />
        </Box>
        {errors.screenshot && (
          <Typography sx={{ fontSize: '0.75rem', mb: '2px', mx: '14px' }} color="error">
            {errors.screenshot.message}
          </Typography>
        )}
        <Btn look="light" width="100%" type="submit" disabled={btnDisable}>
          Submit
        </Btn>
      </Container>
    </Box>
  );
};

export default OrderFeedbackForm;
