'use client';
import React, { useEffect, useState } from 'react';
import { Box, Button, Dialog, DialogContent, DialogActions, Typography } from '@mui/material';
import RSVP from './RSVP';
import { EventDetails } from '@/interfaces/events';
import { useRouter } from 'next/navigation';
import UseToaster from '@/hooks/useToaster';
import Toaster from './Toaster';

interface EventsDialogProps {
  event: EventDetails;
}
const EventsDialog: React.FC<EventsDialogProps> = ({ event }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const router = useRouter();
  const { toasterOpen, error, openToaster, closeToaster } = UseToaster();
  const [toasterMessage, setToasterMessage] = useState<string>('');
  const [toasterType, setToasterType] = useState<string>('');

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);
  const handleConfirmationOpen = () => {
    setDialogOpen(false);
    setConfirmationOpen(true);
  };
  const handleConfirmationClose = () => {
    setConfirmationOpen(false);
    router.push('/events');
  };
  const handleToasterMessage = (type: 'error' | 'success', message: string) => {
    setToasterType(type);
    if (type === 'success') {
      setToasterMessage(message ?? 'Response submitted successfully');
    } else {
      setToasterMessage(message ?? 'Error submitting response');
    }
  };

  useEffect(() => {
    if (toasterMessage) openToaster(toasterMessage);
  }, [openToaster, toasterMessage]);

  return (
    <>
      <Box>
        <Button
          variant="contained"
          className="button button--black"
          disabled={event?.acf?.is_rsvp}
          onClick={handleDialogOpen}
        >
          {event?.acf?.is_rsvp ? 'Already Responded' : ' RSVP'}
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
        onClose={handleConfirmationClose}
        aria-labelledby="confirmation-dialog-title"
      >
        <DialogContent>
          <Typography id="confirmation-dialog-title" variant="h6" component="h1" gutterBottom>
            RSVP Confirmed!
          </Typography>
          <Typography variant="body1" paragraph>
            Please check your email for your event confirmation and details. If you have any additional questions,
            please contact one of the team on info@thevipsuite.co.uk
          </Typography>
          <DialogActions>
            <Button variant="contained" onClick={handleConfirmationClose} className="button button--black">
              Back to All Events
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
