import React, { useState } from 'react';
import { Box, Typography, CardContent, Button, Backdrop, CircularProgress, Input } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import he from 'he';
import { EventDetails } from '@/interfaces/events';
import { defaultValues, RsvpFormSchema, RsvpFormValues } from './RsvpTypes';
import { SendRsvp } from '@/libs/api-manager/manager';
import { formatDateWithOrdinal } from '@/helpers/utils';
import DynamicForm from '@/features/DynamicForm';
import revalidatePathAction from '@/libs/actions';
import { isEmpty } from 'lodash';

interface RSVPProps {
  onClose: () => void;
  onConfirmation: () => void;
  event: EventDetails;
  // eslint-disable-next-line no-unused-vars
  handleToasterMessage: (type: 'error' | 'success', message: string) => void;
}

const RSVP: React.FC<RSVPProps> = ({ onConfirmation, event, handleToasterMessage }) => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [formState, setFormState] = useState({
    showForm: false,
    showReasonField: false,
  });
  const [reasonText, setReasonText] = useState<string>('');
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
        reason: reasonText,
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

  const onSubmitRSVP = async () => {
    setIsPending(true);
    const rsvp = {
      post_type: 'event',
      rsvp_post: event.id,
      is_pleases: 'interested',
    };
    try {
      const res = await SendRsvp(rsvp);
      handleToasterMessage('success', res?.message);
      await revalidatePathAction(`/events/${event.id}`);
      onConfirmation();
    } catch (error) {
      handleToasterMessage('error', String(error));
      setIsPending(false);
    }
  };

  const handleNotAvailable = () => {
    setValue('notAvailable', 'yes');
    setFormState({ showForm: false, showReasonField: true });
  };

  const handleNotInterested = () => {
    setValue('notInterested', 'yes');
    setFormState({ showForm: false, showReasonField: true });
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

  const renderContent = () => {
    switch (true) {
      case formState.showForm:
        return <DynamicForm questions={event.acf.questions} onSubmit={onSubmitDynamic} />;
      case formState.showReasonField:
        return (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h6" gutterBottom>
              Reason
            </Typography>
            <Input
              placeholder="Enter here..."
              fullWidth
              multiline
              rows={4}
              value={reasonText}
              onChange={(e) => {
                setReasonText(e.target.value);
              }}
              sx={{ border: '1px solid black', borderRadius: '15px' }}
            />
            <Box className="site-dialog__action" marginTop={3}>
              <Button variant="contained" type="submit" className="button button--black" disabled={event?.acf?.is_rsvp}>
                Submit
              </Button>
            </Box>
          </form>
        );
      default:
        return (
          <>
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
            {!isEmpty(event.acf.questions) ? (
              <Box mt={2}>
                <Button
                  onClick={() => setFormState({ showForm: true, showReasonField: false })}
                  className="button button--black"
                  type="submit"
                  fullWidth
                >
                  RSVP
                </Button>
              </Box>
            ) : (
              <Box mt={2}>
                <Button onClick={onSubmitRSVP} className="button button--black" type="submit" fullWidth>
                  RSVP
                </Button>
              </Box>
            )}
            <Box className="site-dialog__action" marginTop={3}>
              <Button
                onClick={handleNotAvailable}
                variant="contained"
                className="button button--white"
                disabled={event?.acf?.is_rsvp}
              >
                Not Available
              </Button>
              <Button
                onClick={handleNotInterested}
                variant="contained"
                className="button button--white"
                disabled={event?.acf?.is_rsvp}
              >
                Not Interested
              </Button>
            </Box>
          </>
        );
    }
  };

  return (
    <>
      <Box>
        <CardContent className="site-dialog__content">{renderContent()}</CardContent>
        <Backdrop sx={{ color: '#fff', zIndex: 100000 }} open={isPending}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    </>
  );
};

export default RSVP;
