import React from 'react';
import { Box, Typography, Button, CardContent } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import SelectBox from '../SelectBox';
import { EventDetails } from '@/interfaces/events';
import { defaultValues, RsvpFormValues } from './RsvpTypes';

interface RSVPProps {
  onClose: () => void;
  onConfirmation: () => void;
  event: EventDetails;
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

const RSVP: React.FC<RSVPProps> = ({ onClose, onConfirmation, event }) => {
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<RsvpFormValues>({
    defaultValues: defaultValues,
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

  const rsvpFields = [
    {
      name: 'adultsChildren',
      label: 'How many adults and children?',
      options: adultsChildrenOptions,
      placeholder: 'Select option...',
    },
    {
      name: 'eventTitle',
      label: `Would you like ${event.title.rendered}?`,
      options: adventureGolfOptions,
      placeholder: 'Select option...',
    },
  ];

  const handleNotAvailable = () => {
    setValue('notAvailable', 'yes');
    reset({ adultsChildren: '', eventTitle: '', notAvailable: 'yes', notInterested: null });
    onClose();
  };

  const handleNotInterested = () => {
    setValue('notInterested', 'yes');
    reset({ adultsChildren: '', eventTitle: '', notAvailable: null, notInterested: 'yes' });
    onClose();
  };

  return (
    <Box sx={{ maxWidth: { xs: '100%', sm: 600 }, margin: 'auto', px: { xs: 2, sm: 0 } }}>
      <CardContent>
        <Typography variant="h6" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          {event.title.rendered}
        </Typography>
        <Typography variant="body1" paragraph sx={{ color: '#494947' }}>
          <Box component="span" sx={{ fontWeight: 'bold' }}>
            Date:
          </Box>
          {event.acf.event_start_date} - {event.acf.event_end_date}
        </Typography>
        <Typography variant="body1" paragraph sx={{ color: '#494947' }}>
          <Box component="span" sx={{ fontWeight: 'bold' }}>
            Location:
          </Box>{' '}
          {event.acf.event_location}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          {rsvpFields.map(({ name, options, placeholder, label }) => (
            <Box key={name} sx={{ mt: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, color: '#000000' }}>
                {label}
              </Typography>
              <SelectBox
                name={name as 'adultsChildren' | 'eventTitle' | 'notAvailable' | 'notInterested'}
                control={control}
                options={options}
                label={placeholder}
                errors={errors}
              />
            </Box>
          ))}
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
              type="submit"
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
              type="submit"
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

export default RSVP;
