'use client';

import React, { useState, useTransition } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputForm from '@/components/InputForm/InputForm';
import { SendMessage } from '@/libs/api-manager/manager';
import revalidatePathAction from '@/libs/actions';
import { Backdrop, CircularProgress } from '@mui/material';
import UseToaster from '@/hooks/useToaster';
import Toaster from '@/components/Toaster';
import './MessageForm.scss';

interface FormValues {
  message: string;
}

interface MessageFormProps {
  orderId: number;
}

const MessageForm: React.FC<MessageFormProps> = ({ orderId }) => {
  const [toasterType, setToasterType] = useState<'error' | 'success' | 'warning' | 'info'>('success');
  const [isPending, startTransition] = useTransition();
  const { toasterOpen, error, openToaster, closeToaster } = UseToaster();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    startTransition(async () => {
      try {
        const payload = {
          message: data.message,
          order_id: orderId,
        };
        const res = await SendMessage(orderId, payload);
        await revalidatePathAction(`/messages/${orderId}`);
        setToasterType('success');
        openToaster(res?.message ?? 'Message sent successfully!');
        reset();
      } catch (error) {
        console.error('An error occurred:', error);
        setToasterType('error');
        openToaster(error?.toString() ?? 'Failed to send message');
      }
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getErrorMessage = (error: any): string => {
    if (error && typeof error === 'object' && 'message' in error && typeof error.message === 'string') {
      return error.message;
    }
    return '';
  };

  return (
    <>
      <Box className="message-form-input" display="flex" alignItems="center" justifyContent="center" gap={2} mt={5}>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          display="flex"
          gap={2}
          sx={{
            width: '-webkit-fill-available',
          }}
        >
          <Controller
            name="message"
            control={control}
            defaultValue=""
            rules={{
              required: 'Message is required',
              maxLength: { value: 500, message: 'Message cannot exceed 500 characters' },
            }}
            render={({ field }) => (
              <InputForm
                {...field}
                placeholder="Type a message..."
                type="text"
                error={!!errors.message}
                helperText={getErrorMessage(errors.message)}
                fullWidth
              />
            )}
          />
          <Button type="submit" className="button button--black" sx={{ height: 'fit-content', minWidth: '100px' }}>
            Send
          </Button>
        </Box>
      </Box>
      <Backdrop sx={{ color: '#fff', zIndex: 100000 }} open={isPending}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Toaster open={toasterOpen} setOpen={closeToaster} message={error} severity={toasterType} />
    </>
  );
};

export default MessageForm;