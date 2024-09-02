'use client';
import React, { useState } from 'react';
import { Box, Button, Dialog, DialogContent, DialogActions, Typography } from '@mui/material';
import RSVP from './RSVP';
import { EventDetails } from '@/interfaces/events';
import { useRouter } from 'next/navigation';

interface EventsDialogProps {
  event: EventDetails;
  token: string;
}
const EventsDialog: React.FC<EventsDialogProps> = ({ event, token }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const router = useRouter();

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

  return (
    <>
      <Box>
        <Button variant="contained" className="button button--black" onClick={handleDialogOpen}>
          RSVP
        </Button>
      </Box>

      <Dialog className="site-dialog" open={dialogOpen} onClose={handleDialogClose} fullWidth maxWidth="sm">
        <DialogContent>
          <RSVP onClose={handleDialogClose} event={event} onConfirmation={handleConfirmationOpen} token={token} />
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
    </>
  );
};

export default EventsDialog;
