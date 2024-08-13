'use client';

import React, { Fragment, useState } from 'react';
import { useForm, Controller, Control } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, IconButton, Typography } from '@mui/material';
import Btn from '@/components/Button/CommonBtn';
import * as z from 'zod';
import InputTextFormField from '@/components/InputTextFormField';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Image from 'next/image';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

// Schemas
const orderFeedbackSchema = z.object({
  socialPostUrl: z.string().url('Valid URL is required'),
  screenshot: z
    .custom<File>((val) => val instanceof File || !val)
    .refine((val) => val instanceof File, {
      message: 'Screenshot is required',
    }),
});

const eventFeedbackSchema = z.object({
  rating: z.number().min(1, 'Rating is required'),
  socialPostUrl: z.string().url('Valid URL is required'),
  screenshot: z
    .custom<File>((val) => val instanceof File || !val)
    .refine((val) => val instanceof File, {
      message: 'Screenshot is required',
    }),
});

// Form values types
type OrderFeedbackFormValues = z.infer<typeof orderFeedbackSchema>;
type EventFeedbackFormValues = z.infer<typeof eventFeedbackSchema>;

type FeedbackFormValues = OrderFeedbackFormValues | EventFeedbackFormValues;

// Default values
const defaultOrderValues: OrderFeedbackFormValues = {
  socialPostUrl: '',
  screenshot: undefined as unknown as File,
};

const defaultEventValues: EventFeedbackFormValues = {
  rating: 0,
  socialPostUrl: '',
  screenshot: undefined as unknown as File,
};

// Component props
interface FeedbackFormProps {
  type: 'order' | 'event';
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ type }) => {
  const schema = type === 'order' ? orderFeedbackSchema : eventFeedbackSchema;
  const defaultValues = type === 'order' ? defaultOrderValues : defaultEventValues;

  // Determine the correct control type
  // type ControlType = Control<OrderFeedbackFormValues> | Control<EventFeedbackFormValues>;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FeedbackFormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const [fileName, setFileName] = useState<string | null>(null);
  const [btnDisable, setBtnDisable] = useState<boolean>(false);

  const onSubmit = (data: FeedbackFormValues) => {
    setBtnDisable(true);
    setFileName(null);
    console.log('Form data:', data);
    reset();
    // Handle form submission here
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} className="feedback-form">
      <Typography variant="h2" mb={2}>
        Feedback
      </Typography>

      {type === 'event' && (
        <>
          <Typography mb={1} variant="body1">
            Rating
          </Typography>
          <Controller
            name="rating"
            control={control as Control<EventFeedbackFormValues>}
            render={({ field: { onChange, value } }) => <StarRating value={value} onChange={onChange} />}
          />
        </>
      )}

      <Typography mb={1} variant="body1">
        URL of the related social post
      </Typography>
      <InputTextFormField<FeedbackFormValues>
        name="socialPostUrl"
        control={control}
        placeholder="https://instagram.com/postID"
        errors={errors}
      />

      <Typography mb={1} variant="body1">
        Upload a screenshot of your post
      </Typography>
      <Box mb={1} className="feedback-form__uploader">
        <Controller
          name="screenshot"
          control={control}
          render={({ field: { onChange } }) => (
            <Button
              sx={{ display: 'flex', flexDirection: 'column' }}
              component="label"
              startIcon={!fileName && <Image src="/img/Upload.png" alt="Upload" width={20} height={20} />}
            >
              {fileName ? (
                <Box>
                  <CheckCircleOutlineIcon color="success" />
                  <Typography textAlign="center">{fileName}</Typography>
                </Box>
              ) : (
                'Upload a file'
              )}
              <input
                type="file"
                hidden
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    onChange(file);
                    setFileName(file.name);
                  }
                }}
              />
            </Button>
          )}
        />
      </Box>
      {errors.screenshot && <Typography sx={{ color: 'red' }}>{errors.screenshot.message}</Typography>}

      <Btn
        look="light"
        width="100%"
        type="submit"
        style={{ marginTop: '20px' }}
        className="button button--white"
        disabled={btnDisable}
      >
        Submit
      </Btn>
    </Box>
  );
};

export default FeedbackForm;

interface StarRatingProps {
  value: number;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ value, onChange }) => {
  const handleClick = (index: number) => {
    onChange(index + 1);
  };

  return (
    <Box>
      {[...Array(5)].map((_, index) => (
        <IconButton
          key={index}
          onClick={() => handleClick(index)}
          color={index < value ? 'primary' : 'default'}
          aria-label={`rate ${index + 1} stars`}
        >
          {index < value ? <StarIcon /> : <StarBorderIcon />}
        </IconButton>
      ))}
    </Box>
  );
};
