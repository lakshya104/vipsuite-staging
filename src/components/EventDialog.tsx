'use client';
import React, { useState } from 'react';
import { Box, Button, Dialog, DialogContent, DialogActions, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import RSVP from './RSVP';
import { EventDetails } from '@/interfaces/events';
import { useRouter } from 'next/navigation';

const EventsDialog = ({ event }: { event: EventDetails }) => {
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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 4,
          pb: 10,
        }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: 'black',
            color: 'white',
            borderRadius: '50px',
            px: 15,
            py: 2,
            '&:hover': {
              backgroundColor: 'black',
            },
          }}
          onClick={handleDialogOpen}
        >
          RSVP
        </Button>
      </Box>

      <Dialog open={dialogOpen} onClose={handleDialogClose} fullWidth maxWidth="sm">
        <IconButton
          aria-label="close"
          onClick={handleDialogClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <RSVP onClose={handleDialogClose} event={event} onConfirmation={handleConfirmationOpen} />
        </DialogContent>
      </Dialog>

      <Dialog open={confirmationOpen} onClose={handleConfirmationClose} aria-labelledby="confirmation-dialog-title">
        <DialogContent>
          <Typography
            id="confirmation-dialog-title"
            variant="h6"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 'bold', color: '#1B1B1B' }}
          >
            RSVP Confirmed!
          </Typography>
          <Typography variant="body1" paragraph>
            Please check your email for your event confirmation and details. If you have any additional questions,
            please contact one of the team on info@thevipsuite.co.uk
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleConfirmationClose}
            sx={{
              backgroundColor: 'black',
              color: 'white',
              borderRadius: '50px',
              px: 12,
              py: 2,
              border: '2px solid black',
              '&:hover': {
                backgroundColor: 'black',
              },
            }}
          >
            Back to All Events
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EventsDialog;
