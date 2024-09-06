import React, { useState } from 'react';
import { Box, Typography, Button, CardContent } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { OpportunityDetails } from '@/interfaces/opportunitiesDetails';
import { formatDateWithOrdinalAndTime } from '@/helpers/utils';
import { SendRsvp } from '@/libs/api-manager/manager';
import { revalidateTag } from '@/libs/actions';

interface RSVPProps {
  onClose: () => void;
  onConfirmation: () => void;
  opportunity: OpportunityDetails;
  token: string;
  // eslint-disable-next-line no-unused-vars
  handleToasterMessage: (type: 'error' | 'success') => void;
}

interface RsvpFormValues {
  notAvailable: string | null;
  notInterested: string | null;
}

const defaultValues: RsvpFormValues = {
  notAvailable: null,
  notInterested: null,
};

const OppotunityRSVP: React.FC<RSVPProps> = ({ onClose, onConfirmation, opportunity, token, handleToasterMessage }) => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const { handleSubmit, setValue, reset } = useForm<RsvpFormValues>({
    defaultValues,
  });

  const onSubmit: SubmitHandler<RsvpFormValues> = async (data) => {
    if (data.notAvailable === 'yes' || data.notInterested === 'yes') {
      setIsPending(true);
      const rsvp = {
        post_type: 'opportunity',
        rsvp_post: 605,
        is_pleases: data.notAvailable !== 'yes' ? 'not-interested' : 'not-available',
      };
      try {
        await SendRsvp(rsvp, token);
        revalidateTag('getOpportunityDetails');
        handleToasterMessage('success');
      } catch (error) {
        handleToasterMessage('error');
      } finally {
        setIsPending(false);
        onConfirmation();
        onClose();
        reset();
      }
    } else {
      setIsPending(true);
      const rsvp = {
        post_type: 'opportunity',
        rsvp_post: opportunity.id,
        is_pleases: 'interested',
      };
      try {
        await SendRsvp(rsvp, token);
        revalidateTag('getOpportunityDetails');
        handleToasterMessage('success');
      } catch (error) {
        handleToasterMessage('error');
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
    <Box>
      <CardContent className="site-dialog__content">
        <Typography variant="h2" gutterBottom>
          {opportunity?.title?.rendered}
        </Typography>
        <Typography variant="body1">
          <Box component="strong">Date:</Box> {formatDateWithOrdinalAndTime(opportunity.acf.date)}
        </Typography>
        <Typography variant="body1" paragraph>
          <Box component="strong">Location:</Box> {opportunity?.acf?.location}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box mb={2.5}>
            <Button
              type="submit"
              variant="contained"
              className="button button--black"
              disabled={isPending || opportunity.acf.is_rsvp}
            >
              {opportunity?.acf?.is_rsvp ? ' Already Registered' : 'RSVP'}
            </Button>
          </Box>
          <Box className="site-dialog__action">
            <Button
              type="submit"
              onClick={handleNotAvailable}
              variant="contained"
              className="button button--white"
              disabled={opportunity.acf.is_rsvp}
            >
              Not Available
            </Button>
            <Button
              onClick={handleNotInterested}
              type="submit"
              variant="contained"
              className="button button--white"
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
