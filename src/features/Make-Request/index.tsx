'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Backdrop, Box, CircularProgress, Typography } from '@mui/material';
import React, { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Btn from '@/components/Button/CommonBtn';
import './MakeRequest.scss';
import UseToaster from '@/hooks/useToaster';
import Toaster from '@/components/Toaster';
import { InputTextAreaFormField } from '@/components/InputTextFormField';
import { MakeRequestSubmit } from '@/libs/api-manager/manager';

const formSchema = z.object({
  request_user_response: z
    .string()
    .min(1, 'This field is required')
    .min(15, 'Describe the item in at least 15 characters')
    .max(400, 'Describe the item in less than 400 characters'),
});

type FormValues = z.infer<typeof formSchema>;

interface MakeRequestPayload {
  request_type: 'make-request' | 'others';
  request_title?: string;
  request_description?: string;
  request_user_response: string;
}
interface MakeRequestProps {
  title: string;
  description: string;
  type: 'make-request' | 'others';
  closeDialog: () => void;
}

const MakeRequest: React.FC<MakeRequestProps> = ({ title, description, type, closeDialog }) => {
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
      request_user_response: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setIsPending(true);
      const payload: MakeRequestPayload = {
        request_type: type,
        ...(title && { request_title: title }),
        ...(description && { request_description: description }),
        request_user_response: data.request_user_response,
      };
      const formData = new FormData();
      Object.keys(payload).forEach((key) => {
        const value = payload[key as keyof MakeRequestPayload];
        if (value !== undefined) {
          formData.append(key, value);
        }
      });
      const res = await MakeRequestSubmit(formData);
      setToasterType('success');
      openToaster(res?.message);
      setTimeout(() => {
        closeDialog();
      }, 1500);
    } catch (error) {
      setToasterType('error');
      openToaster('Error during submitting the form. ' + error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Fragment>
      <Box className="bg-textBlack gray-card__details" pb={5}>
        <Box className="gray-card__details-inner">
          <Typography variant="h2" align="center">
            {title || ' Make a Request'}
          </Typography>
          <Typography component="p" align="center">
            {description}
          </Typography>
          <form className="gray-card__form" onSubmit={handleSubmit(onSubmit)}>
            <Box>
              <InputTextAreaFormField
                name="request_user_response"
                control={control}
                placeholder="Enter your request ..."
                errors={errors}
              />
            </Box>
            <Btn look="dark-filled" disabled={isPending} className="button button--white" width="100%" type="submit">
              {isPending ? 'Submitting' : 'Submit'}
            </Btn>
          </form>
        </Box>
      </Box>
      <Backdrop sx={{ zIndex: 100000 }} open={isPending}>
        <CircularProgress sx={{ color: 'white' }} />
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
