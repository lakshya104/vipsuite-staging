'use client';
import Btn from '@/components/Button/CommonBtn';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Backdrop, Box, CircularProgress, Typography } from '@mui/material';
import React, { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import './MakeRequest.scss';
import UseToaster from '@/hooks/useToaster';
import Toaster from '@/components/Toaster';
import { InputTextAreaFormField } from '@/components/InputTextFormField';
import { MakeRequestSubmit } from '@/libs/api-manager/manager';
import { DashboardContent } from '@/interfaces';
import { useUserInfoStore } from '@/store/useStore';

const formSchema = z.object({
  request_content: z
    .string()
    .min(1, 'This field is required')
    .min(15, 'Describe the item in at least 15 characters')
    .max(400, 'Describe the item in less than 400 characters'),
});

type FormValues = z.infer<typeof formSchema>;

interface MakeRequestProps {
  dashboardContent: DashboardContent;
}

const MakeRequest: React.FC<MakeRequestProps> = ({ dashboardContent }) => {
  const router = useRouter();
  const { vipIdStore, tokenStore } = useUserInfoStore();
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
      request_content: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setIsPending(true);
      const res = await MakeRequestSubmit(vipIdStore, tokenStore, data);
      setToasterType('success');
      openToaster(res?.message);
      setTimeout(() => {
        router.push('/home');
      }, 1500);
    } catch (error) {
      setToasterType('error');
      openToaster('Error during submit the form. ' + error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Fragment>
      <Box className="bg-textBlack gray-card__details">
        <Box className="gray-card__details-inner">
          <Typography variant="h2" align="center">
            Make a Request
          </Typography>
          <Typography component="p" align="center">
            {dashboardContent.make_request_description}
          </Typography>
          <form className="gray-card__form" onSubmit={handleSubmit(onSubmit)}>
            <Box>
              <InputTextAreaFormField
                name="request_content"
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
