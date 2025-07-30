'use client';
import React, { useState } from 'react';
import { Box, Button, Dialog, DialogContent, DialogActions, Typography } from '@mui/material';
import { EventDetails } from '@/interfaces/events';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isEmpty } from 'lodash';
import RSVP from './RSVP';
import UseToaster from '@/hooks/useToaster';
import Toaster from './Toaster';
import en from '@/helpers/lang';
import { paths } from '@/helpers/paths';
import { vipInitialSchema, vipOptionalSchema, VipOptions } from '@/interfaces';
import OrderEventButton from './OrderEventButton';
import VipOrderForm from './VipOrderForm';

interface EventsDialogProps {
  event: EventDetails;
  isUserAgent: boolean;
  vipsLoading: boolean;
  vipOptions: VipOptions[];
}

const EventsDialog: React.FC<EventsDialogProps> = ({ event, isUserAgent, vipOptions, vipsLoading }) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [confirmationOpen, setConfirmationOpen] = useState<boolean>(false);
  const router = useRouter();
  const { toasterOpen, error, openToaster, closeToaster } = UseToaster();
  const [toasterType, setToasterType] = useState<string>('');
  const [vipPayloadData, setVipPayloadData] = useState({});
  const [vipSchemas, setVipSchemas] = useState(() => (!isUserAgent ? vipOptionalSchema : vipInitialSchema));
  const vipSchema = z.object({
    vip_profile_ids: vipSchemas.profileId,
    vip_profile_names: vipSchemas.profileName,
  });
  const {
    handleSubmit,
    control,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(vipSchema),
    defaultValues: {
      vip_profile_ids: [],
      vip_profile_names: '',
    },
  });

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleConfirmationOpen = () => {
    setDialogOpen(false);
    setConfirmationOpen(true);
  };

  const handleClose = (event: unknown, reason: 'backdropClick' | 'escapeKeyDown') => {
    if (reason === 'backdropClick') {
      return;
    }
    setConfirmationOpen(false);
    router.push(paths.root.events.getHref());
  };

  const handleToasterMessage = (type: 'error' | 'success', message: string) => {
    setToasterType(type);
    if (type === 'success') {
      handleDialogClose();
    }
    openToaster(message);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    const payloadWithVipData = {
      ...(isUserAgent && {
        ...(!isEmpty(data?.vip_profile_ids) && { vip_profile_ids: data.vip_profile_ids.join(',') }),
        ...(data?.vip_profile_names && { vip_profile_names: data.vip_profile_names }),
      }),
    };
    if (isUserAgent) {
      setVipPayloadData(payloadWithVipData);
      reset();
      setVipSchemas(vipInitialSchema);
    }
    handleDialogOpen();
  };

  const handleVipSchemas = (schemas: { profileId: z.ZodArray<z.ZodString, 'many'>; profileName: z.ZodString }) => {
    setVipSchemas(schemas);
  };

  return (
    <>
      {event?.acf?.show_rsvp_button ? (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} className="product-size">
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
          <Button
            variant="contained"
            className="button button--black w-100"
            type="submit"
            disabled={event?.acf?.is_rsvp || vipsLoading}
          >
            {event?.acf?.is_rsvp ? 'Responded' : 'RSVP'}
          </Button>
        </Box>
      ) : (
        <OrderEventButton
          disabled={!!event?.acf?.is_rsvp}
          isUserAgent={isUserAgent}
          vipsLoading={vipsLoading}
          eventId={event?.id}
          handleToasterMessage={handleToasterMessage}
          vipOptions={vipOptions}
        />
      )}

      <Dialog className="site-dialog" open={dialogOpen} onClose={handleDialogClose} fullWidth maxWidth="sm">
        <DialogContent>
          <RSVP
            onClose={handleDialogClose}
            event={event}
            onConfirmation={handleConfirmationOpen}
            handleToasterMessage={handleToasterMessage}
            vipPayloadData={vipPayloadData}
            isUserAgent={isUserAgent}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        className="site-dialog"
        open={confirmationOpen}
        onClose={handleClose}
        aria-labelledby="confirmation-dialog-title"
      >
        <DialogContent>
          <Typography id="confirmation-dialog-title" variant="h6" component="h1" gutterBottom>
            {en.events.confirmationRsvp.title}
          </Typography>
          <Typography variant="body1" paragraph>
            {en.events.confirmationRsvp.description}
          </Typography>
          <DialogActions>
            <Button
              variant="contained"
              onClick={() => {
                setConfirmationOpen(false);
                router.push(paths.root.events.getHref());
              }}
              className="button button--black"
            >
              {en.events.confirmationRsvp.cta}
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      <Toaster
        open={toasterOpen}
        setOpen={closeToaster}
        message={error}
        severity={toasterType as 'error' | 'success' | 'warning' | 'info'}
      />
    </>
  );
};

export default EventsDialog;
