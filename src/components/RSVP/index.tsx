import React, { useState } from 'react';
import { Box, Typography, CardContent, Button, Backdrop, CircularProgress, Input } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import he from 'he';
import { EventDetails } from '@/interfaces/events';
import { defaultValues, RsvpFormSchema, RsvpFormValues } from './RsvpTypes';
import { SendRsvp } from '@/libs/api-manager/manager';
// import { formatDateWithOrdinal } from '@/helpers/utils';
import revalidatePathAction from '@/libs/actions';
import en from '@/helpers/lang';
import { paths } from '@/helpers/paths';
import DynamicForm from '@/features/DynamicForm';

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
        await revalidatePathAction(paths.root.eventDetails.getHref(event?.id));
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
      // ...(updatedPayload && { questions: updatedPayload }),
    };
    try {
      const res = await SendRsvp(rsvp);
      handleToasterMessage('success', res?.message);
      await revalidatePathAction(paths.root.eventDetails.getHref(event?.id));
      onConfirmation();
    } catch (error) {
      handleToasterMessage('error', String(error));
      setIsPending(false);
    }
  };

  const handleNotAvailable = () => {
    setValue('notAvailable', 'yes');
    setFormState({ showReasonField: true, showForm: false });
  };

  const handleNotInterested = () => {
    setValue('notInterested', 'yes');
    setFormState({ showReasonField: true, showForm: false });
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
        if (field?.input_type === 'file_upload' && field?.is_required) {
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
    const rsvp = {
      post_type: 'event',
      rsvp_post: event.id,
      is_pleases: 'interested',
      ...(updatedPayload && { questions: updatedPayload }),
    };
    try {
      const res = await SendRsvp(rsvp);
      handleToasterMessage('success', res?.message);
      await revalidatePathAction(paths.root.eventDetails.getHref(event?.id));
      onConfirmation();
    } catch (error) {
      handleToasterMessage('error', String(error));
      setIsPending(false);
    }
  };

  const renderContent = () => {
    switch (true) {
      case formState.showReasonField:
        return (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h6" gutterBottom>
              {en.events.eventRsvp.reason}
            </Typography>
            <Input
              placeholder={en.events.eventRsvp.reasonPlaceholder}
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
                {en.events.eventRsvp.submit}
              </Button>
            </Box>
          </form>
        );
      case formState.showForm:
        return (
          <DynamicForm
            questions={event?.acf?.questions}
            onSubmit={onSubmitDynamic}
            ctaText="Submit"
            alreadyOrdered={event?.acf?.is_rsvp}
            ctaIfAlreadyOrdered="Already Responded"
          />
        );
      default:
        return (
          <>
            <Typography variant="h2" gutterBottom>
              {he.decode(event?.title?.rendered || '')}
            </Typography>
            {(event?.acf?.event_start_date || event?.acf?.event_end_date) && (
              <Typography variant="body1">
                <Box component="strong">{en.events.date} </Box>
                <>
                  {event?.acf?.event_start_date && event.acf.event_start_date}
                  {event?.acf?.event_start_date && event?.acf?.event_end_date && ' - '}
                  {event?.acf?.event_end_date && event.acf.event_end_date}
                </>
              </Typography>
            )}
            {event?.acf?.event_location && event.acf.event_location.trim() !== '' && (
              <Typography variant="body1" paragraph>
                <Box component="strong">{en.events.location}</Box> {event.acf.event_location}
              </Typography>
            )}
            <Box mt={2}>
              <Button
                onClick={
                  event?.acf?.questions ? () => setFormState({ showReasonField: false, showForm: true }) : onSubmitRSVP
                }
                className="button button--black"
                type="submit"
                fullWidth
              >
                {en.events.eventRsvp.text}
              </Button>
            </Box>
            <Box className="site-dialog__action" marginTop={3}>
              <Button
                onClick={handleNotAvailable}
                variant="contained"
                className="button button--white"
                disabled={event?.acf?.is_rsvp}
              >
                {en.events.eventRsvp.notAvailable}
              </Button>
              <Button
                onClick={handleNotInterested}
                variant="contained"
                className="button button--white"
                disabled={event?.acf?.is_rsvp}
              >
                {en.events.eventRsvp.notInterested}
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
