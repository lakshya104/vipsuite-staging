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
import { InputTextAreaFormField } from '../InputTextFormField';

interface RSVPProps {
  onClose: () => void;
  onConfirmation: () => void;
  event: EventDetails;
  // eslint-disable-next-line no-unused-vars
  handleToasterMessage: (type: 'error' | 'success', message: string) => void;
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

const RSVP: React.FC<RSVPProps> = ({ onClose, onConfirmation, event, handleToasterMessage }) => {
  const [isePending, setIsPending] = useState<boolean>(false);
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
        message: data.message,
      };
      const formData = new FormData();
      Object.entries(rsvp).forEach(([key, value]) => {
        const valueToAppend = value === null ? '' : String(value);
        formData.append(key, valueToAppend);
      });
      try {
        const res = await SendRsvp(formData);
        revalidateTag('getEventDetails');
        handleToasterMessage('success', res?.message);
      } catch (error) {
        handleToasterMessage('error', String(error));
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
        would_you_like: data.eventTitle === 'no' ? false : true,
        message: data.message,
      };
      const formData = new FormData();
      Object.entries(rsvp).forEach(([key, value]) => {
        const valueToAppend = value === null ? '' : String(value);
        formData.append(key, valueToAppend);
      });
      try {
        const res = await SendRsvp(formData);
        revalidateTag('getEventDetails');
        handleToasterMessage('success', res?.message);
        onConfirmation();
      } catch (error) {
        handleToasterMessage('error', String(error));
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
      type: 'select',
    },
    {
      name: 'eventTitle',
      label: `Would you like ${he.decode(event?.title?.rendered)}?`,
      options: adventureGolfOptions,
      placeholder: 'Select option...',
      type: 'select',
    },
    {
      name: 'message',
      label: `Would you like to add anything?`,
      placeholder: `Would you like to add anything?`,
      type: 'textarea',
    },
  ];

  const handleNotAvailable = () => {
    setValue('notAvailable', 'yes');
  };

  const handleNotInterested = () => {
    setValue('notInterested', 'yes');
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
            {rsvpFields.map(({ name, options, label, type, placeholder }) => (
              <Box key={name}>
                {type === 'select' ? (
                  <Box>
                    <Typography variant="body1" className="form-label">
                      {label}
                    </Typography>
                    <SelectBoxWithoutLabel
                      placeholder={placeholder}
                      name={name as 'adultsChildren' | 'eventTitle' | 'notAvailable' | 'notInterested'}
                      control={control}
                      options={options}
                      errors={errors}
                    />
                  </Box>
                ) : (
                  <Box>
                    <InputTextAreaFormField
                      name={'message'}
                      control={control}
                      placeholder={placeholder}
                      errors={errors}
                    />
                  </Box>
                )}
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
