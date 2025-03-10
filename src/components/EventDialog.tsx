'use client';
import React, { useState } from 'react';
import { Box, Button, Dialog, DialogContent, DialogActions, Typography } from '@mui/material';
import RSVP from './RSVP';
import { EventDetails } from '@/interfaces/events';
import { useRouter } from 'next/navigation';
import UseToaster from '@/hooks/useToaster';
import Toaster from './Toaster';
import en from '@/helpers/lang';
import { paths } from '@/helpers/paths';

interface EventsDialogProps {
  event: EventDetails;
}
const EventsDialog: React.FC<EventsDialogProps> = ({ event }) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [confirmationOpen, setConfirmationOpen] = useState<boolean>(false);
  const router = useRouter();
  const { toasterOpen, error, openToaster, closeToaster } = UseToaster();
  const [toasterType, setToasterType] = useState<string>('');

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

  return (
    <>
      <Box>
        <Button
          variant="contained"
          className="button button--black w-100"
          disabled={event?.acf?.is_rsvp}
          onClick={handleDialogOpen}
        >
          {event?.acf?.is_rsvp ? 'Responded' : 'RSVP'}
        </Button>
      </Box>

      <Dialog className="site-dialog" open={dialogOpen} onClose={handleDialogClose} fullWidth maxWidth="sm">
        <DialogContent>
          <RSVP
            onClose={handleDialogClose}
            event={event}
            onConfirmation={handleConfirmationOpen}
            handleToasterMessage={handleToasterMessage}
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
