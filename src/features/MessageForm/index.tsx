'use client';
import React, { useEffect, useState, useTransition } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputForm from '@/components/InputForm/InputForm';
import { GetMessageCount, SendMessage } from '@/libs/api-manager/manager';
import revalidatePathAction from '@/libs/actions';
import { Backdrop, CircularProgress } from '@mui/material';
import UseToaster from '@/hooks/useToaster';
import Toaster from '@/components/Toaster';
import './MessageForm.scss';
import en from '@/helpers/lang';
import { paths } from '@/helpers/paths';
import { messageDetailsSchema } from './schema';
import { useMessageCountStore } from '@/store/useStore';

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
  const { setMessageCount } = useMessageCountStore();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(messageDetailsSchema),
    defaultValues: {
      message: '',
    },
  });

  useEffect(() => {
    async function revalidateInbox() {
      await revalidatePathAction(paths.root.inbox.getHref());
      const count = await GetMessageCount();
      setMessageCount(count.data['message-count'] || 0);
    }
    revalidateInbox();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (data: FormValues) => {
    startTransition(async () => {
      try {
        const payload = {
          message: data.message,
          order_id: orderId,
        };
        const res = await SendMessage(orderId, payload);
        await revalidatePathAction(paths.root.messageDetails.getHref(orderId));
        setToasterType('success');
        openToaster(res?.message || en.messageDetail.successToaster);
        reset();
      } catch (error) {
        console.error(en.messageDetail.mesageFailed, error);
        setToasterType('error');
        openToaster(error?.toString() || en.messageDetail.errToaster);
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
            render={({ field }) => (
              <InputForm
                {...field}
                placeholder={en.messageDetail.placeholder}
                type="text"
                error={!!errors.message}
                helperText={getErrorMessage(errors.message)}
                fullWidth
              />
            )}
          />
          <Button type="submit" className="button button--black" sx={{ height: 'fit-content', minWidth: '100px' }}>
            {en.messageDetail.sendBtn}
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
