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
import en from '@/helpers/lang';
import { paths, withSearchParams } from '@/helpers/paths';
import { vipInitialSchema, vipOptionalSchema, VipOptions } from '@/interfaces';
import VipOrderForm from './VipOrderForm';
import { isEmpty, isUndefined } from 'lodash';

const formSchema = z.object({
  itemName: z.string().min(1, en.lookBookForm.fieldErrMessage),
});

interface RequestItemFormButtonProps {
  postId: number;
  isUserAgent: boolean;
  vipsLoading: boolean;
  vipOptions: VipOptions[];
}

const RequestItemFormButton: React.FC<RequestItemFormButtonProps> = ({
  postId,
  isUserAgent,
  vipOptions,
  vipsLoading,
}) => {
  const [open, setOpen] = useState(false);
  const { setLookbookDescription, setAgentVipInfo, clearLookbookData } = useLookbookOrder();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { toasterOpen, error, openToaster, closeToaster } = UseToaster();
  const [vipSchemas, setVipSchemas] = useState(() => (!isUserAgent ? vipOptionalSchema : vipInitialSchema));
  const vipSchema = z.object({
    vip_profile_ids: vipSchemas.profileId,
    vip_profile_names: vipSchemas.profileName,
  });

  let combinedSchema = formSchema;
  if (isUserAgent) {
    combinedSchema = combinedSchema.merge(vipSchema);
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  type FormValues = z.infer<typeof combinedSchema> & {
    vip_profile_ids?: string[];
    vip_profile_names?: string;
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<FormValues>({
    resolver: zodResolver(combinedSchema),
    defaultValues: {
      itemName: '',
      ...(isUserAgent && {
        vip_profile_ids: [],
        vip_profile_names: '',
      }),
    },
  });

  const onSubmit = (data: FormValues) => {
    const payloadWithVipData = {
      ...(isUserAgent && {
        ...(!isEmpty(data?.vip_profile_ids) &&
          !isUndefined(data.vip_profile_ids) && { vip_profile_ids: data.vip_profile_ids.join(',') }),
        ...(data?.vip_profile_names && { vip_profile_names: data.vip_profile_names }),
      }),
    };
    clearLookbookData();
    try {
      startTransition(() => {
        setAgentVipInfo(payloadWithVipData);
        setLookbookDescription(data.itemName);
        router.push(
          withSearchParams(() => paths.root.basket.getHref(), { step: 1, isLookbook: 'true', postId: postId }),
        );
      });
      handleClose();
    } catch (error) {
      openToaster(String(error));
    } finally {
      reset();
      setVipSchemas(vipInitialSchema);
    }
  };

  const handleVipSchemas = (schemas: { profileId: z.ZodArray<z.ZodString, 'many'>; profileName: z.ZodString }) => {
    setVipSchemas(schemas);
  };

  return (
    <>
      <Box className="request-button">
        <Button className="button w-100" onClick={handleClickOpen}>
          {en.lookBookForm.btn}
        </Button>
      </Box>
      <Dialog className="site-dialog" open={open} onClose={handleClose}>
        <DialogTitle>{en.lookBookForm.formSubTitle}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box>
              <Typography variant="body1" fontWeight="500" sx={{ mb: 2 }}>
                {en.lookBookForm.description}
              </Typography>
              <InputTextAreaFormField
                name="itemName"
                control={control}
                placeholder={en.lookBookForm.placeholder}
                errors={errors}
              />
              {isUserAgent && (
                <VipOrderForm
                  clearErrors={clearErrors}
                  control={control}
                  errors={errors}
                  handleVipSchemas={handleVipSchemas}
                  vipOptions={vipOptions}
                  vipsLoading={vipsLoading}
                />
              )}
            </Box>
            <DialogActions>
              <Btn look="dark-filled" width="100%" type="submit" disabled={isPending || vipsLoading}>
                {en.lookBookForm.submitText}
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
