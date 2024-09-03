import React, { useState } from 'react';
import { Box, Typography, Button, CardContent } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { OpportunityDetails } from '@/interfaces/opportunitiesDetails';
import { formatDateWithOrdinalAndTime } from '@/helpers/utils';
import { get } from 'lodash';
import { SendRsvp } from '@/libs/api-manager/manager';

interface RSVPProps {
  onClose: () => void;
  onConfirmation: () => void;
  opportunity: OpportunityDetails;
  token: string;
}

interface RsvpFormValues {
  notAvailable: string | null;
  notInterested: string | null;
}

const defaultValues: RsvpFormValues = {
  notAvailable: null,
  notInterested: null,
};

const OppotunityRSVP: React.FC<RSVPProps> = ({ onClose, onConfirmation, opportunity, token }) => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const { handleSubmit, setValue, reset } = useForm<RsvpFormValues>({
    defaultValues,
  });

  const onSubmit: SubmitHandler<RsvpFormValues> = async (data) => {
    if (data.notAvailable === 'yes' || data.notInterested === 'yes') {
      const rsvp = {
        post_type: 'opportunity',
        rsvp_post: 605,
        is_pleases: data.notAvailable !== 'yes' ? 'not-interested' : 'not-available',
      };
      try {
        await SendRsvp(rsvp, token);
        onClose();
        reset();
      } catch (error) {
        const errorMessage = get(error, 'message', 'Error sending RSVP');
        console.error(errorMessage);
      }
    } else {
      setIsPending(true);
      const rsvp = {
        post_type: 'opportunity',
        rsvp_post: 605,
        is_pleases: 'interested',
      };
      try {
        await SendRsvp(rsvp, token);
      } catch (error) {
        const errorMessage = get(error, 'message', 'Error sending RSVP');
        console.error(errorMessage);
      } finally {
        setIsPending(false);
        onConfirmation();
        onClose();
        reset();
      }
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
          {opportunity?.title?.rendered}
        </Typography>
        <Typography variant="body1" paragraph sx={{ color: '#494947' }}>
          <Box component="span" sx={{ fontWeight: 'bold' }}>
            Date:
          </Box>{' '}
          {formatDateWithOrdinalAndTime(opportunity.acf.date)}
        </Typography>
        <Typography variant="body1" paragraph sx={{ color: '#494947' }}>
          <Box component="span" sx={{ fontWeight: 'bold' }}>
            Location:
          </Box>{' '}
          {opportunity?.acf?.location}
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
              disabled={isPending || opportunity.acf.is_rsvp}
            >
              {opportunity?.acf?.is_rsvp ? ' Already Submitted' : 'RSVP'}
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
              type="submit"
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
              disabled={opportunity.acf.is_rsvp}
            >
              Not Available
            </Button>
            <Button
              onClick={handleNotInterested}
              type="submit"
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
              disabled={opportunity.acf.is_rsvp}
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
