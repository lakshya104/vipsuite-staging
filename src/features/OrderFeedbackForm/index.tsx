'use client';

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Typography } from '@mui/material';
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
    <Box component="form" onSubmit={handleSubmit(onSubmit)} className="feedback-form">
      <Typography variant="h2" mb={2}>
        Feedback
      </Typography>
      <Typography mb={1} variant="body1">
        URL of the related social post
      </Typography>
      <InputTextFormField
        name="socialPostUrl"
        control={control}
        placeholder="https://instagram.com/postID"
        errors={errors}
      />
      <Typography mb={1} variant="body1">
        Upload a screenshot of your post
      </Typography>
      <Box mb={6} className="feedback-form__uploader">
        <Controller
          name="screenshot"
          control={control}
          // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
          render={({ field: { onChange, value, ...field } }) => (
            <Button component="label" startIcon={!fileName && <UploadFileIcon />} {...field}>
              {fileName ? (
                <Box>
                  <CheckCircleOutlineIcon color="success" />
                  <Typography textAlign="center">{fileName}</Typography>
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
      {errors.screenshot && <Typography color="error">{errors.screenshot.message}</Typography>}
      <Btn look="light" width="100%" type="submit" className="button button--white" disabled={btnDisable}>
        Submit
      </Btn>
    </Box>
  );
};

export default OrderFeedbackForm;
