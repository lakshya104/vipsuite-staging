import React, { useState } from 'react';
import { Box, Typography, Button, CardContent, Backdrop, CircularProgress } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import he from 'he';
import { OpportunityDetails } from '@/interfaces/opportunitiesDetails';
import { SendRsvp } from '@/libs/api-manager/manager';
import revalidatePathAction from '@/libs/actions';
import DynamicForm from '@/features/DynamicForm';

interface RSVPProps {
  onClose: () => void;
  onConfirmation: () => void;
  opportunity: OpportunityDetails;
  // eslint-disable-next-line no-unused-vars
  handleToasterMessage: (type: 'error' | 'success', message?: string) => void;
}

interface RsvpFormValues {
  notAvailable: string | null;
  notInterested: string | null;
}

const defaultValues: RsvpFormValues = {
  notAvailable: null,
  notInterested: null,
};

const OppotunityRSVP: React.FC<RSVPProps> = ({ onClose, onConfirmation, opportunity, handleToasterMessage }) => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const { handleSubmit, setValue, reset } = useForm<RsvpFormValues>({
    defaultValues,
  });

  const onSubmit: SubmitHandler<RsvpFormValues> = async (data) => {
    if (data.notAvailable === 'yes' || data.notInterested === 'yes') {
      setIsPending(true);
      const rsvp = {
        post_type: 'opportunity',
        rsvp_post: opportunity.id,
        is_pleases: data.notAvailable !== 'yes' ? 'not-interested' : 'not-available',
      };
      try {
        const res = await SendRsvp(rsvp);
        await revalidatePathAction(`/opportunities/${opportunity.id}`);
        handleToasterMessage('success', res?.message);
      } catch (error) {
        handleToasterMessage('error', String(error));
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
  };

  const handleNotInterested = () => {
    setValue('notInterested', 'yes');
    reset({ notAvailable: null, notInterested: 'yes' });
  };
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        const base64String = result.replace(/^data:[^;]+;base64,/, '');
        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmitDynamic = async (data: any) => {
    setIsPending(true);
    const updatedPayload = await Promise.all(
      opportunity.acf.questions.map(async (field) => {
        const key = field.title.toLowerCase().replace(/[^a-z0-9]/g, '');
        let answer;
        if (field.input_type === 'file_upload') {
          answer = await convertToBase64(data[key]);
        } else {
          answer = data[key];
        }
        return {
          ...field,
          answer,
        };
      }),
    );
    const payload = {
      post_type: 'opportunity',
      rsvp_post: opportunity.id,
      is_pleases: 'interested',
      questions: updatedPayload,
    };
    try {
      const res = await SendRsvp(payload);
      handleToasterMessage('success', res?.message);
      await revalidatePathAction(`/events/${opportunity.id}`);
      onConfirmation();
    } catch (error) {
      handleToasterMessage('error', String(error));
      setIsPending(false);
    }
  };

  return (
    <Box>
      <CardContent className="site-dialog__content">
        <Typography variant="h2" gutterBottom>
          {he.decode(opportunity?.title?.rendered)}
        </Typography>
        {opportunity.acf.questions && <DynamicForm questions={opportunity.acf.questions} onSubmit={onSubmitDynamic} />}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box className="site-dialog__action" marginTop={3}>
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
      <Backdrop sx={{ color: '#fff', zIndex: 100 }} open={isPending}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default OppotunityRSVP;
