import React, { useState } from 'react';
import { Backdrop, Box, Button, CardContent, CircularProgress, Dialog, DialogContent } from '@mui/material';
import { isEmpty } from 'lodash';
import { useForm } from 'react-hook-form';
import VipOrderForm from './VipOrderForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserRole } from '@/helpers/enums';
import { SendRsvp } from '@/libs/api-manager/manager';
import revalidatePathAction from '@/libs/actions';
import { paths } from '@/helpers/paths';
import { z } from 'zod';
import { vipInitialSchema, vipOptionalSchema } from '@/interfaces';
import { EventDetails } from '@/interfaces/events';
import DynamicForm from '@/features/DynamicForm';

interface OrderEventButtonProps {
  isUserAgent: boolean;
  vipsLoading: boolean;
  vipOptions: { label: string; value: string }[];
  // eslint-disable-next-line no-unused-vars
  handleToasterMessage: (type: 'error' | 'success', message: string) => void;
  disabled: boolean;
  userRole: UserRole;
  onConfirmation: () => void;
  event: EventDetails;
  vipPayloadData: {
    [key: string]: string;
  };
}

const OrderEventButton: React.FC<OrderEventButtonProps> = ({
  isUserAgent,
  vipsLoading,
  vipOptions,
  handleToasterMessage,
  disabled,
  userRole,
  onConfirmation,
  event,
}) => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [vipSchemas, setVipSchemas] = useState(() => (!isUserAgent ? vipOptionalSchema : vipInitialSchema));
  const [showForm, setShowForm] = useState<boolean>(false);
  const [vipPayloadData, setVipPayloadData] = useState({});
  const vipSchema = z.object({
    vip_profile_ids: vipSchemas.profileId,
    vip_profile_names: vipSchemas.profileName,
  });
  const {
    handleSubmit,
    control,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(vipSchema),
    defaultValues: {
      vip_profile_ids: [],
      vip_profile_names: '',
    },
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmitSimple = async (data: any) => {
    const payloadWithVipData = {
      ...(isUserAgent && {
        ...(!isEmpty(data?.vip_profile_ids) && { vip_profile_ids: data.vip_profile_ids.join(',') }),
        ...(data?.vip_profile_names && { vip_profile_names: data.vip_profile_names }),
      }),
    };
    setVipPayloadData(payloadWithVipData);
    setShowForm(true);
  };

  const handleVipSchemas = (schemas: { profileId: z.ZodArray<z.ZodString, 'many'>; profileName: z.ZodString }) => {
    setVipSchemas(schemas);
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
      ...(isUserAgent && vipPayloadData),
      order_by: userRole,
    };
    try {
      const res = await SendRsvp(rsvp);
      handleToasterMessage('success', res?.message);
      await revalidatePathAction(paths.root.eventDetails.getHref(event?.id));
      onConfirmation();
    } catch (error) {
      handleToasterMessage('error', String(error));
    } finally {
      setShowForm(false);
      setIsPending(false);
    }
  };
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmitSimple)} className="product-size">
      {isUserAgent && (
        <VipOrderForm
          clearErrors={clearErrors}
          control={control}
          errors={errors}
          handleVipSchemas={handleVipSchemas}
          vipOptions={vipOptions}
          vipsLoading={vipsLoading}
        />
      )}
      <Button
        variant="contained"
        type="submit"
        className="button button--black w-100"
        disabled={vipsLoading || isPending || disabled}
      >
        Request Now
      </Button>
      <Backdrop sx={{ color: '#fff', zIndex: 10000 }} open={isPending}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Dialog className="site-dialog" open={showForm} onClose={() => setShowForm(false)} fullWidth maxWidth="sm">
        <DialogContent>
          <CardContent className="site-dialog__content">
            <DynamicForm
              questions={event?.acf?.questions}
              onSubmit={onSubmitDynamic}
              ctaText="Submit"
              alreadyOrdered={event?.acf?.is_rsvp}
              ctaIfAlreadyOrdered="Already Responded"
            />
          </CardContent>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default OrderEventButton;
