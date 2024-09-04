'use client';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import React, { useState } from 'react';
import { InputTextAreaFormField } from '@/components/InputTextFormField';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Btn from './Button/CommonBtn';

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
    console.log('Form data:', data);
    handleClose();
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
    </>
  );
};

export default RequestItemFormButton;
