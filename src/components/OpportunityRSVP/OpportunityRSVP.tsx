import React from 'react';
import { Box, Typography, Button, CardContent } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';

interface RSVPProps {
  onClose: () => void;
  onConfirmation: () => void;
}

interface RsvpFormValues {
  notAvailable: string | null;
  notInterested: string | null;
}

const defaultValues: RsvpFormValues = {
  notAvailable: null,
  notInterested: null,
};

const OppotunityRSVP: React.FC<RSVPProps> = ({ onClose, onConfirmation }) => {
  const { handleSubmit, setValue, reset } = useForm<RsvpFormValues>({
    defaultValues,
  });

  const onSubmit: SubmitHandler<RsvpFormValues> = (data) => {
    if (data.notAvailable === 'yes' || data.notInterested === 'yes') {
      onClose();
      reset();
    } else {
      onClose();
      reset();
      onConfirmation();
    }
  };

  const handleNotAvailable = () => {
    setValue('notAvailable', 'yes');
    reset({ notAvailable: 'yes', notInterested: null });
    onClose();
  };

  const handleNotInterested = () => {
    setValue('notInterested', 'yes');
    reset({ notAvailable: null, notInterested: 'yes' });
    onClose();
  };

  return (
    <Box sx={{ maxWidth: { xs: '100%', sm: 600 }, margin: 'auto', px: { xs: 2, sm: 0 } }}>
      <CardContent>
        <Typography variant="h6" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Barbie x Heinz
        </Typography>
        <Typography variant="body1" paragraph sx={{ color: '#494947' }}>
          <Box component="span" sx={{ fontWeight: 'bold' }}>
            Date:
          </Box>{' '}
          Wednesday 19th June @ 7pm
        </Typography>
        <Typography variant="body1" paragraph sx={{ color: '#494947' }}>
          <Box component="span" sx={{ fontWeight: 'bold' }}>
            Location:
          </Box>{' '}
          123 London Street, London, EC1 AAA
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, pb: 3 }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: 'black',
                color: 'white',
                borderRadius: '50px',
                px: { xs: 5, sm: 15 },
                py: { xs: 1, sm: 2 },
                '&:hover': {
                  backgroundColor: 'black',
                },
              }}
            >
              RSVP
            </Button>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mt: 4,
              pb: 3,
              flexDirection: { xs: 'column', sm: 'row' },
            }}
          >
            <Button
              onClick={handleNotAvailable}
              variant="contained"
              sx={{
                backgroundColor: 'white',
                color: 'black',
                borderRadius: '50px',
                px: { xs: 4, sm: 7 },
                py: { xs: 1, sm: 2 },
                border: '2px solid black',
                mb: { xs: 2, sm: 0 },
                '&:hover': {
                  backgroundColor: 'white',
                },
              }}
            >
              Not Available
            </Button>
            <Button
              onClick={handleNotInterested}
              variant="contained"
              sx={{
                backgroundColor: 'white',
                color: 'black',
                borderRadius: '50px',
                px: { xs: 4, sm: 7 },
                py: { xs: 1, sm: 2 },
                border: '2px solid black',
                '&:hover': {
                  backgroundColor: 'white',
                },
              }}
            >
              Not Interested
            </Button>
          </Box>
        </form>
      </CardContent>
    </Box>
  );
};

export default OppotunityRSVP;
