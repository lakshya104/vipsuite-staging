import React, { useState } from 'react';
import { Box, Typography, Button, CardContent, Backdrop, CircularProgress, Input } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import he from 'he';
import { OpportunityDetails } from '@/interfaces/opportunitiesDetails';
import { SendRsvp } from '@/libs/api-manager/manager';
import revalidatePathAction from '@/libs/actions';
import DynamicForm from '@/features/DynamicForm';
import { isEmpty } from 'lodash';
import en from '@/helpers/lang';

interface RSVPProps {
  onClose: () => void;
  onConfirmation: () => void;
  opportunity: OpportunityDetails;
  // eslint-disable-next-line no-unused-vars
  handleToasterMessage: (type: 'error' | 'success', message?: string) => void;
}

interface RsvpFormValues {
  notAvailable: string | null;
  notInterested: string | null;
}

const defaultValues: RsvpFormValues = {
  notAvailable: null,
  notInterested: null,
};

const OppotunityRSVP: React.FC<RSVPProps> = ({ onClose, onConfirmation, opportunity, handleToasterMessage }) => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [formState, setFormState] = useState({
    showForm: false,
    showReasonField: false,
  });
  const [reasonText, setReasonText] = useState<string>('');
  const { handleSubmit, setValue, reset } = useForm<RsvpFormValues>({
    defaultValues,
  });

  const onSubmit: SubmitHandler<RsvpFormValues> = async (data) => {
    if (data.notAvailable === 'yes' || data.notInterested === 'yes') {
      setIsPending(true);
      const rsvp = {
        post_type: 'opportunity',
        rsvp_post: opportunity.id,
        is_pleases: data.notAvailable !== 'yes' ? 'not-interested' : 'not-available',
        reason: reasonText,
      };
      try {
        const res = await SendRsvp(rsvp);
        await revalidatePathAction(`/opportunities/${opportunity?.id}`);
        handleToasterMessage('success', res?.message);
      } catch (error) {
        handleToasterMessage('error', String(error));
      } finally {
        setIsPending(false);
        onConfirmation();
        onClose();
        reset();
      }
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
      opportunity.acf.questions.map(async (field) => {
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
      post_type: 'opportunity',
      rsvp_post: opportunity.id,
      is_pleases: 'interested',
      questions: updatedPayload,
    };
    try {
      const res = await SendRsvp(payload);
      handleToasterMessage('success', res?.message);
      await revalidatePathAction(`/events/${opportunity?.id}`);
      onConfirmation();
    } catch (error) {
      handleToasterMessage('error', String(error));
      setIsPending(false);
    }
  };

  const onSubmitRSVP = async () => {
    setIsPending(true);
    const rsvp = {
      post_type: 'opportunity',
      rsvp_post: opportunity.id,
      is_pleases: 'interested',
    };
    try {
      const res = await SendRsvp(rsvp);
      handleToasterMessage('success', res?.message);
      await revalidatePathAction(`/events/${opportunity?.id}`);
      onConfirmation();
    } catch (error) {
      handleToasterMessage('error', String(error));
      setIsPending(false);
    }
  };

  const renderContent = () => {
    switch (true) {
      case formState.showForm:
        return <DynamicForm questions={opportunity.acf.questions} onSubmit={onSubmitDynamic} />;
      case formState.showReasonField:
        return (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h6" gutterBottom>
              {en.opportunities.opportunityRsvp.reason}
            </Typography>
            <Input
              placeholder={en.opportunities.opportunityRsvp.reasonPlaceholder}
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
              <Button
                variant="contained"
                type="submit"
                className="button button--black"
                disabled={opportunity?.acf?.is_rsvp}
              >
                {en.opportunities.opportunityRsvp.submit}
              </Button>
            </Box>
          </form>
        );
      default:
        return (
          <>
            <Typography variant="h2" gutterBottom>
              {he.decode(opportunity?.title?.rendered)}
            </Typography>
            {!isEmpty(opportunity.acf.questions) ? (
              <Box mt={2}>
                <Button
                  onClick={() => setFormState({ showForm: true, showReasonField: false })}
                  className="button button--black"
                  type="submit"
                  fullWidth
                >
                  {en.opportunities.opportunityRsvp.text}
                </Button>
              </Box>
            ) : (
              <Box mt={2}>
                <Button onClick={onSubmitRSVP} className="button button--black" type="submit" fullWidth>
                  {en.opportunities.opportunityRsvp.text}
                </Button>
              </Box>
            )}
            <Box className="site-dialog__action" marginTop={3}>
              <Button
                onClick={handleNotAvailable}
                variant="contained"
                className="button button--white"
                disabled={opportunity?.acf?.is_rsvp}
              >
                {en.opportunities.opportunityRsvp.notAvailable}
              </Button>
              <Button
                onClick={handleNotInterested}
                variant="contained"
                className="button button--white"
                disabled={opportunity?.acf?.is_rsvp}
              >
                {en.opportunities.opportunityRsvp.notInterested}
              </Button>
            </Box>
          </>
        );
    }
  };

  return (
    <Box>
      <CardContent className="site-dialog__content">{renderContent()}</CardContent>
      <Backdrop sx={{ color: '#fff', zIndex: 100 }} open={isPending}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default OppotunityRSVP;
