import React from 'react';
import { Box, Typography, Button, CardContent } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import SelectBox from '../SelectBox';

type FormValues = {
  [key: string]: string;
};

export const adultsChildrenOptions = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
];

export const adventureGolfOptions = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
];

export const rsvpFields = [
  {
    name: 'adultsChildren',
    label: 'Select option...',
    type: 'select',
    options: adultsChildrenOptions,
    placeholder: '',
  },
  {
    name: 'adventureGolf',
    label: 'Select option...',
    type: 'select',
    options: adventureGolfOptions,
    placeholder: '',
  },
];

const RSVP: React.FC<{ onClose: () => void; onConfirmation: () => void }> = ({ onClose, onConfirmation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    console.log({ data });

    onClose();
    onConfirmation();
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto' }}>
      <CardContent>
        <Typography variant="h6" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          LEGOLAND Woodland Village
        </Typography>
        <Typography variant="body1" paragraph sx={{ color: '#494947' }}>
          <Box component="span" sx={{ fontWeight: 'bold' }}>
            Date:
          </Box>{' '}
          Saturday 18th - Sunday 19th May
        </Typography>
        <Typography variant="body1" paragraph sx={{ color: '#494947' }}>
          <Box component="span" sx={{ fontWeight: 'bold' }}>
            Location:
          </Box>{' '}
          LEGOLAND Windsor Resort, Winkfield Road, Windsor, Berkshire, SL4 4AY
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          {rsvpFields.map(({ name, options, placeholder }) => (
            <Box key={name} sx={{ mt: 2 }}>
              <SelectBox
                name={name}
                control={control}
                placeholder={placeholder}
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
                px: 15,
                py: 2,
                '&:hover': {
                  backgroundColor: 'black',
                },
              }}
            >
              RSVP
            </Button>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, pb: 3 }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: 'white',
                color: 'black',
                borderRadius: '50px',
                px: 7,
                py: 2,
                border: '2px solid black',
                '&:hover': {
                  backgroundColor: 'white',
                },
              }}
            >
              Not Available
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: 'white',
                color: 'black',
                borderRadius: '50px',
                px: 7,
                py: 2,
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
