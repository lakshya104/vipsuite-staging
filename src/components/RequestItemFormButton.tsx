'use client';
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import React, { useState, useTransition } from 'react';
import { InputTextAreaFormField } from '@/components/InputTextFormField';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Btn from './Button/CommonBtn';
import { useLookbookOrder } from '@/store/useStore';
import { useRouter } from 'next/navigation';
import UseToaster from '@/hooks/useToaster';
import Toaster from './Toaster';

const formSchema = z.object({
  itemName: z
    .string()
    .min(1, 'This field is required')
    .min(15, 'Describe the item in at least 15 characters')
    .max(400, 'Describe the item in less than 400 characters'),
});

type FormValues = z.infer<typeof formSchema>;

const RequestItemFormButton: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { setLookbookDescription } = useLookbookOrder();
  const [isPending, startTransition] = useTransition();
  const { toasterOpen, error, openToaster, closeToaster } = UseToaster();
  const router = useRouter();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
    try {
      startTransition(() => {
        setLookbookDescription(data.itemName);
        router.push('/basket?step=1&isLookbook=true');
      });
      handleClose();
    } catch (error) {
      openToaster(String(error));
    }
  };

  return (
    <>
      <Box className="request-button">
        <Button className="button" onClick={handleClickOpen}>
          Request Items from Lookbook
        </Button>
      </Box>

      <Dialog className="site-dialog" open={open} onClose={handleClose}>
        <DialogTitle>Request Form</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box>
              <Typography variant="body1" fontWeight="500">
                Please let us know which items you would like to request. Include size and colour if needed.
              </Typography>
              <InputTextAreaFormField
                name="itemName"
                control={control}
                placeholder="e.g. Red dress on Page 4 in size 12"
                errors={errors}
              />
            </Box>
            <DialogActions>
              <Btn look="dark-filled" width="100%" type="submit">
                Submit Request
              </Btn>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      <Backdrop sx={{ color: '#fff', zIndex: 10000 }} open={isPending}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Toaster open={toasterOpen} setOpen={closeToaster} message={error} severity="error" />
    </>
  );
};

export default RequestItemFormButton;
