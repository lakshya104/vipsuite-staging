'use client';
import React, { useState, useTransition } from 'react';
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
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Btn from './Button/CommonBtn';
import { InputTextAreaFormField } from '@/components/InputTextFormField';
import { useLookbookOrder } from '@/store/useStore';
import UseToaster from '@/hooks/useToaster';
import Toaster from './Toaster';

const formSchema = z.object({
  itemName: z.string().min(1, 'This field is required'),
});

type FormValues = z.infer<typeof formSchema>;

interface RequestItemFormButtonProps {
  postId: number;
}
const RequestItemFormButton: React.FC<RequestItemFormButtonProps> = ({ postId }) => {
  const [open, setOpen] = useState(false);
  const { setLookbookDescription, clearLookbookDescription } = useLookbookOrder();
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
    clearLookbookDescription();
    try {
      startTransition(() => {
        setLookbookDescription(data.itemName);
        router.push(`/basket?step=1&isLookbook=true&postId=${postId}`);
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
              <Typography variant="body1" fontWeight="500" sx={{ mb: 2 }}>
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
