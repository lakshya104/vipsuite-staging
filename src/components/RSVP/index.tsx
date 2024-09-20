import React, { useState } from 'react';
import { Box, Typography, Button, CardContent } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import he from 'he';
import { EventDetails } from '@/interfaces/events';
import { defaultValues, RsvpFormSchema, RsvpFormValues } from './RsvpTypes';
import { SendRsvp } from '@/libs/api-manager/manager';
import { revalidateTag } from '@/libs/actions';
import { formatDateWithOrdinal } from '@/helpers/utils';
import SelectBoxWithoutLabel from '../SelectBoxWithOutLabel';
import { useCurrentUser } from '@/hooks/useCurrentUser';

interface RSVPProps {
  onClose: () => void;
  onConfirmation: () => void;
  event: EventDetails;
  token: string;
  // eslint-disable-next-line no-unused-vars
  handleToasterMessage: (type: 'error' | 'success') => void;
}

const adultsChildrenOptions = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
];

const adventureGolfOptions = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
];

const RSVP: React.FC<RSVPProps> = ({ onClose, onConfirmation, event, token, handleToasterMessage }) => {
  const [isePending, setIsPending] = useState<boolean>(false);
  const user = useCurrentUser();
  const vipId = user?.vip_profile_id;
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<RsvpFormValues>({
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
        number_of_attendees: 0,
        would_you_like: false,
      };
      try {
        await SendRsvp(rsvp, token, vipId);
        revalidateTag('getEventDetails');
        handleToasterMessage('success');
      } catch (error) {
        handleToasterMessage('error');
      } finally {
        onClose();
        reset();
      }
    } else {
      setIsPending(true);
      const rsvp = {
        post_type: 'event',
        rsvp_post: event.id,
        is_pleases: 'interested',
        number_of_attendees: data.adultsChildren,
        would_you_like: true,
      };
      try {
        await SendRsvp(rsvp, token, vipId);
        revalidateTag('getEventDetails');
        handleToasterMessage('success');
        onConfirmation();
      } catch (error) {
        handleToasterMessage('error');
        onClose();
      } finally {
        reset();
      }
    }
  };

  const rsvpFields = [
    {
      name: 'adultsChildren',
      label: 'How many adults and children?',
      options: adultsChildrenOptions,
      placeholder: 'Select option...',
    },
    {
      name: 'eventTitle',
      label: `Would you like ${he.decode(event?.title?.rendered)}?`,
      options: adventureGolfOptions,
      placeholder: 'Select option...',
    },
  ];

  const handleNotAvailable = () => {
    setValue('notAvailable', 'yes');
    reset({ adultsChildren: '', eventTitle: '', notAvailable: 'yes', notInterested: null });
  };

  const handleNotInterested = () => {
    setValue('notInterested', 'yes');
    reset({ adultsChildren: '', eventTitle: '', notAvailable: null, notInterested: 'yes' });
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
          <form onSubmit={handleSubmit(onSubmit)}>
            {rsvpFields.map(({ name, options, label }) => (
              <Box key={name}>
                <Typography variant="body1" className="form-label">
                  {label}
                </Typography>
                <SelectBoxWithoutLabel
                  placeholder="Select option..."
                  name={name as 'adultsChildren' | 'eventTitle' | 'notAvailable' | 'notInterested'}
                  control={control}
                  options={options}
                  errors={errors}
                />
              </Box>
            ))}
            <Box mb={2.5}>
              <Button
                type="submit"
                variant="contained"
                className="button button--black"
                disabled={isePending || event?.acf?.is_rsvp}
              >
                {event?.acf?.is_rsvp ? 'Already Responded' : 'RSVP'}
              </Button>
            </Box>
            <Box className="site-dialog__action">
              <Button
                onClick={handleNotAvailable}
                variant="contained"
                type="submit"
                className="button button--white"
                disabled={isePending || event?.acf?.is_rsvp}
              >
                Not Available
              </Button>
              <Button
                onClick={handleNotInterested}
                variant="contained"
                type="submit"
                className="button button--white"
                disabled={isePending || event?.acf?.is_rsvp}
              >
                Not Interested
              </Button>
            </Box>
          </form>
        </CardContent>
      </Box>
    </>
  );
};

export default RSVP;
