import React, { useState } from 'react';
import { Backdrop, Box, Button, CircularProgress } from '@mui/material';
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

interface OrderEventButtonProps {
  isUserAgent: boolean;
  vipsLoading: boolean;
  eventId: number;
  vipOptions: { label: string; value: string }[];
  // eslint-disable-next-line no-unused-vars
  handleToasterMessage: (type: 'error' | 'success', message: string) => void;
  disabled: boolean;
}

const OrderEventButton: React.FC<OrderEventButtonProps> = ({
  isUserAgent,
  vipsLoading,
  eventId,
  vipOptions,
  handleToasterMessage,
  disabled,
}) => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [vipSchemas, setVipSchemas] = useState(() => (!isUserAgent ? vipOptionalSchema : vipInitialSchema));
  const vipSchema = z.object({
    vip_profile_ids: vipSchemas.profileId,
    vip_profile_names: vipSchemas.profileName,
  });
  const {
    handleSubmit,
    control,
    reset,
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

    setIsPending(true);
    const rsvp = {
      post_type: 'event',
      rsvp_post: eventId,
      ...(isUserAgent && payloadWithVipData),
      order_by: isUserAgent ? UserRole.Agent : UserRole.Vip,
      is_pleases: 'interested',
    };
    try {
      const res = await SendRsvp(rsvp);
      handleToasterMessage('success', res?.message);
    } catch (error) {
      handleToasterMessage('error', String(error));
    } finally {
      await revalidatePathAction(paths.root.eventDetails.getHref(eventId));
      setVipSchemas(vipInitialSchema);
      reset();
      setIsPending(false);
    }
  };

  const handleVipSchemas = (schemas: { profileId: z.ZodArray<z.ZodString, 'many'>; profileName: z.ZodString }) => {
    setVipSchemas(schemas);
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
        Order Now
      </Button>
      <Backdrop sx={{ color: '#fff', zIndex: 10000 }} open={isPending}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default OrderEventButton;
