import React, { useState } from 'react';
import { Box, Typography, CardContent, Button, Backdrop, CircularProgress } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import he from 'he';
import { EventDetails } from '@/interfaces/events';
import { defaultValues, RsvpFormSchema, RsvpFormValues } from './RsvpTypes';
import { SendRsvp } from '@/libs/api-manager/manager';
import { formatDateWithOrdinal } from '@/helpers/utils';
import DynamicForm from '@/features/DynamicForm';
import revalidatePathAction from '@/libs/actions';

interface RSVPProps {
  onClose: () => void;
  onConfirmation: () => void;
  event: EventDetails;
  // eslint-disable-next-line no-unused-vars
  handleToasterMessage: (type: 'error' | 'success', message: string) => void;
}

const RSVP: React.FC<RSVPProps> = ({ onConfirmation, event, handleToasterMessage }) => {
  const [isePending, setIsPending] = useState<boolean>(false);
  const { handleSubmit, setValue } = useForm<RsvpFormValues>({
    defaultValues: defaultValues,
    resolver: zodResolver(RsvpFormSchema),
  });

  const onSubmit: SubmitHandler<RsvpFormValues> = async (data) => {
    if (data.notAvailable === 'yes' || data.notInterested === 'yes') {
      setIsPending(true);
      const rsvp = {
        post_type: 'event',
        rsvp_post: event.id,
        is_pleases: data.notAvailable !== 'yes' ? 'not-interested' : 'not-available',
      };
      try {
        const res = await SendRsvp(rsvp);
        handleToasterMessage('success', res?.message);
        await revalidatePathAction(`/events/${event.id}`);
      } catch (error) {
        handleToasterMessage('error', String(error));
        setIsPending(false);
      }
    }
  };

  const handleNotAvailable = () => {
    setValue('notAvailable', 'yes');
  };

  const handleNotInterested = () => {
    setValue('notInterested', 'yes');
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
      event.acf.questions.map(async (field) => {
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
      post_type: 'event',
      rsvp_post: event.id,
      is_pleases: 'interested',
      questions: updatedPayload,
    };
    try {
      const res = await SendRsvp(payload);
      handleToasterMessage('success', res?.message);
      await revalidatePathAction(`/events/${event.id}`);
      onConfirmation();
    } catch (error) {
      handleToasterMessage('error', String(error));
      setIsPending(false);
    }
  };

  return (
    <>
      <Box>
        <CardContent className="site-dialog__content">
          <Typography variant="h2" gutterBottom>
            {he.decode(event?.title?.rendered)}
          </Typography>
          <Typography variant="body1">
            <Box component="strong">Date:</Box>
            {formatDateWithOrdinal(event.acf.event_start_date, false)} -{' '}
            {formatDateWithOrdinal(event.acf.event_end_date, true)}
          </Typography>
          <Typography variant="body1" paragraph>
            <Box component="strong">Location:</Box> {event.acf.event_location}
          </Typography>
          {event.acf.questions && <DynamicForm questions={event.acf.questions} onSubmit={onSubmitDynamic} />}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box className="site-dialog__action" marginTop={3}>
              <Button
                onClick={handleNotAvailable}
                variant="contained"
                type="submit"
                className="button button--white"
                disabled={event?.acf?.is_rsvp}
              >
                Not Available
              </Button>
              <Button
                onClick={handleNotInterested}
                variant="contained"
                type="submit"
                className="button button--white"
                disabled={event?.acf?.is_rsvp}
              >
                Not Interested
              </Button>
            </Box>
          </form>
        </CardContent>
        <Backdrop sx={{ color: '#fff', zIndex: 100000 }} open={isePending}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    </>
  );
};

export default RSVP;
