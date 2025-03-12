'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useForm, Controller, Control, FieldErrors } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Backdrop, Box, Button, CircularProgress, IconButton, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ErrorIcon from '@mui/icons-material/Error';
import Btn from '@/components/Button/CommonBtn';
import InputTextFormField from '@/components/InputTextFormField';
import { OrderFeedback } from '@/libs/api-manager/manager';
import UseToaster from '@/hooks/useToaster';
import Toaster from '@/components/Toaster';
import revalidatePathAction from '@/libs/actions';
import {
  defaultEventValues,
  defaultOrderValues,
  EventFeedbackFormValues,
  eventFeedbackSchema,
  FeedbackFormValues,
  orderFeedbackSchema,
} from './schema';
import en from '@/helpers/lang';
import { paths } from '@/helpers/paths';

interface FeedbackFormProps {
  type: 'order' | 'event';
  orderId: number;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ type, orderId }) => {
  const schema = type === 'order' ? orderFeedbackSchema : eventFeedbackSchema;
  const defaultValues = type === 'order' ? defaultOrderValues : defaultEventValues;
  const { toasterOpen, error, openToaster, closeToaster } = UseToaster();
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [toasterType, setToasterType] = useState<string>('');
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

  type FormData = {
    socialPostUrl: string;
    screenshot: File | null;
    rating?: number;
  };

  const onSubmit = async (data: FormData) => {
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
        const res = await OrderFeedback(orderId, feedback);
        await revalidatePathAction(paths.root.orderDetails.getHref(orderId));
        setIsSubmitted(true);
        setToasterType('success');
        openToaster(res.message || en.feedbackForm.successMessage);
        setFileName(null);
        reset();
      } catch (error) {
        setToasterType('error');
        openToaster(String(error) || en.feedbackForm.errorMessage);
      } finally {
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
        const res = await OrderFeedback(orderId, feedback);
        await revalidatePathAction(paths.root.orderDetails.getHref(orderId));
        setIsSubmitted(true);
        setToasterType('success');
        openToaster(res.message || en.feedbackForm.successMessage);
        setFileName(null);
        reset();
      } catch (error) {
        setToasterType('error');
        openToaster(String(error) || en.feedbackForm.errorMessage);
      } finally {
        setBtnDisable(false);
      }
    }
  };

  return (
    <>
      {isSubmitted ? null : (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} className="feedback-form">
          <Typography variant="h2" mb={2}>
            {en.feedbackForm.formTitle}
          </Typography>

          {type === 'event' && (
            <Box mb={2}>
              <Typography mb={1} variant="body1">
                {en.feedbackForm.fieldNames.rating}
              </Typography>
              <Box mb={2}>
                <Controller
                  name="rating"
                  control={control as Control<EventFeedbackFormValues>}
                  render={({ field: { onChange, value } }) => (
                    <Box>
                      <StarRating
                        value={value}
                        onChange={onChange}
                        error={(errors as FieldErrors<EventFeedbackFormValues>).rating ? true : false}
                      />
                      {(errors as FieldErrors<EventFeedbackFormValues>).rating && (
                        <Typography
                          sx={{
                            color: '#d32f2f !important',
                            marginLeft: 1.5,
                            fontWeight: '400 !important',
                            fontSize: '0.75rem !important',
                          }}
                        >
                          {(errors as FieldErrors<EventFeedbackFormValues>).rating?.message}
                        </Typography>
                      )}
                    </Box>
                  )}
                />
              </Box>
            </Box>
          )}

          <Typography mb={1} variant="body1">
            {en.feedbackForm.fieldNames.url}
          </Typography>
          <InputTextFormField<FeedbackFormValues>
            name="socialPostUrl"
            control={control}
            placeholder={en.feedbackForm.fieldPlaceholders.url}
            errors={errors}
            noLabel={true}
          />

          <Typography mb={1} variant="body1">
            {en.feedbackForm.fieldNames.screesshot}
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
                  startIcon={
                    !fileName && errors.screenshot ? (
                      <ErrorIcon color="error" />
                    ) : (
                      !fileName && <Image src="/img/Upload.png" alt="Upload" width={20} height={20} />
                    )
                  }
                >
                  {fileName ? (
                    <Box
                      sx={{
                        display: 'flex',
                        gap: 1,
                        flexDirection: { xs: 'column', md: 'row' },
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <CheckCircleOutlineIcon color="success" />
                      <Typography textAlign="center">{fileName}</Typography>
                    </Box>
                  ) : errors.screenshot ? (
                    <span style={{ color: '#d32f2f', textTransform: 'capitalize' }}>
                      {en.feedbackForm.fieldPlaceholders.screenshot}
                    </span>
                  ) : (
                    <span style={{ textTransform: 'capitalize' }}>{en.feedbackForm.fieldPlaceholders.screenshot}</span>
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
            style={{ marginTop: '20px', marginBottom: '20px' }}
            className="button button--white"
            disabled={btnDisable}
          >
            {btnDisable ? en.feedbackForm.submitting : en.feedbackForm.submit}
          </Btn>
        </Box>
      )}
      <Toaster
        open={toasterOpen}
        setOpen={closeToaster}
        message={error}
        severity={toasterType as 'error' | 'success' | 'warning' | 'info'}
      />
      <Backdrop sx={{ color: '#fff', zIndex: 10000 }} open={btnDisable}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default FeedbackForm;

interface StarRatingProps {
  value: number;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: number) => void;
  error: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({ value, onChange, error }) => {
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
          {index < value ? <StarIcon /> : <StarBorderIcon color={error ? 'error' : 'inherit'} />}
        </IconButton>
      ))}
    </Box>
  );
};
