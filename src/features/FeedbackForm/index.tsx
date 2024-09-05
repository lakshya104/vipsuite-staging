'use client';
import React, { useState } from 'react';
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
import { EventFeedback, OrderFeedback } from '@/libs/api-manager/manager';
import UseToaster from '@/hooks/useToaster';
import Toaster from '@/components/Toaster';

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

export type OrderFeedbackFormValues = z.infer<typeof orderFeedbackSchema>;
type EventFeedbackFormValues = z.infer<typeof eventFeedbackSchema>;

type FeedbackFormValues = OrderFeedbackFormValues | EventFeedbackFormValues;

const defaultOrderValues: OrderFeedbackFormValues = {
  socialPostUrl: '',
  screenshot: undefined as unknown as File,
};

const defaultEventValues: EventFeedbackFormValues = {
  rating: 0,
  socialPostUrl: '',
  screenshot: undefined as unknown as File,
};
interface FeedbackFormProps {
  type: 'order' | 'event';
  token: string;
  vipId: number;
  orderId: number;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ type, token, vipId, orderId }) => {
  const schema = type === 'order' ? orderFeedbackSchema : eventFeedbackSchema;
  const defaultValues = type === 'order' ? defaultOrderValues : defaultEventValues;
  const { toasterOpen, error, openToaster, closeToaster } = UseToaster();
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [btnDisable, setBtnDisable] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FeedbackFormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        const base64String = result.replace(/^data:image\/(png|jpeg);base64,/, '');
        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    setBtnDisable(true);
    if (type === 'order') {
      try {
        let screenshotBase64 = null;
        if (data.screenshot instanceof File) {
          screenshotBase64 = await convertToBase64(data.screenshot);
        }
        const feedback = {
          social_media_post_url: data.socialPostUrl,
          screenshot: screenshotBase64,
        };
        await OrderFeedback(token, vipId, orderId, feedback);
        setIsSubmitted(true);
      } catch (error) {
        openToaster('Error submitting feedback:' + error);
      } finally {
        setFileName(null);
        reset();
        setBtnDisable(false);
      }
    } else {
      try {
        let screenshotBase64 = null;
        if (data.screenshot instanceof File) {
          screenshotBase64 = await convertToBase64(data.screenshot);
        }
        const feedback = {
          social_media_post_url: data.socialPostUrl,
          screenshot: screenshotBase64,
          rating: data.rating,
        };
        await EventFeedback(token, vipId, orderId, feedback);
        setIsSubmitted(true);
      } catch (error) {
        openToaster('Error submitting feedback:' + error);
      } finally {
        setFileName(null);
        reset();
        setBtnDisable(false);
      }
    }
  };

  return (
    <>
      {isSubmitted ? (
        <FeedbackSuccess />
      ) : (
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
            noLabel={true}
          />

          <Typography mb={1} variant="body1">
            Upload a screenshot of your post
          </Typography>
          <Box
            mb={1}
            className="feedback-form__uploader"
            sx={{ borderColor: errors.screenshot ? '#d32f2f !important' : null }}
          >
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
                  ) : errors.screenshot ? (
                    <span style={{ color: '#d32f2f' }}>Screenshot is required</span>
                  ) : (
                    'Upload a screenshot'
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
          {errors.screenshot && (
            <Typography
              sx={{
                color: '#d32f2f !important',
                marginLeft: 1.5,
                fontWeight: '400 !important',
                fontSize: '0.75rem !important',
              }}
            >
              {errors.screenshot.message}
            </Typography>
          )}

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
      )}
      <Toaster open={toasterOpen} setOpen={closeToaster} message={error} severity="error" />
    </>
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

const FeedbackSuccess = () => {
  return (
    <Box
      className="feedback-form"
      sx={{
        minHeight: '50vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 3,
          // border: '1px solid black',
          borderRadius: '8px',
          backgroundColor: '#FFFFF7',
          textAlign: 'center',
          maxWidth: '400px',
          margin: '0 auto',
        }}
      >
        <CheckCircleOutlineIcon sx={{ fontSize: '30px', color: 'black', mb: 2 }} />
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 400 }}>
          Your feedback has been successfully submitted!
        </Typography>
      </Box>
    </Box>
  );
};
