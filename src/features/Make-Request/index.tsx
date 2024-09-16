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
import { DashboardContent } from '@/interfaces/brand';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { MakeRequestSubmit } from '@/libs/api-manager/manager';

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
  const user = useCurrentUser();
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
      await MakeRequestSubmit(user?.vip_profile_id, user?.token, data);
      setToasterType('success');
      openToaster('Request submitted successfully');
      router.push('/home');
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
            <Btn look="dark-filled" className="button button--white" width="100%" type="submit">
              Submit Request
            </Btn>
          </form>
        </Box>
      </Box>
      <Backdrop sx={{ zIndex: 100 }} open={isPending}>
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
