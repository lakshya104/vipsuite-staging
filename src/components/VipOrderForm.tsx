import React from 'react';
import { Control, FieldErrors } from 'react-hook-form';
import { Box, Typography, Skeleton } from '@mui/material';
import { z } from 'zod';
import MultiSelectBox from './MultiSelectBox';
import InputTextFormField from './InputTextFormField';

interface VipOption {
  label: string;
  value: string;
}

interface VipSchemas {
  profileId: z.ZodArray<z.ZodString>;
  profileName: z.ZodString;
}

interface VipOrderFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  errors: FieldErrors;
  vipsLoading: boolean;
  vipOptions: VipOption[];
  // eslint-disable-next-line no-unused-vars
  handleVipSchemas: (schemas: VipSchemas) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  clearErrors: any;
}

const VipOrderForm: React.FC<VipOrderFormProps> = ({
  control,
  errors,
  vipsLoading,
  vipOptions,
  handleVipSchemas,
  clearErrors,
}) => {
  const renderVipsForAgent = () => {
    if (vipsLoading) {
      return (
        <Box sx={{ mb: 2 }}>
          <Skeleton variant="text" width="60%" height={24} sx={{ mb: 1.5 }} />
          <Skeleton variant="rectangular" height={46} sx={{ mb: 2 }} />
          <Skeleton variant="text" width="40%" height={24} sx={{ mb: 1.5 }} />
          <Skeleton variant="rectangular" height={46} />
        </Box>
      );
    }
    return (
      <Box sx={{ mb: 2 }}>
        <Typography
          sx={{ fontWeight: 500, color: 'rgb(27, 27, 27) !important', mb: 1, fontSize: '1rem !important' }}
          gutterBottom
        >
          Which VIP would you like to request for?
        </Typography>
        <MultiSelectBox
          control={control}
          errors={errors}
          name="vip_profile_ids"
          options={vipOptions}
          placeholder="Select a VIP..."
          onChange={(value) => {
            if (value && value.length > 0) {
              clearErrors('vip_profile_names');
              handleVipSchemas({
                profileId: z.array(z.string()),
                profileName: z.string(),
              });
            } else {
              handleVipSchemas({
                profileId: z.array(z.string()).min(1, 'Please select at least one VIP or enter a name'),
                profileName: z.string().min(1, 'Please select at least one VIP or enter a name'),
              });
            }
          }}
        />
        <Typography
          sx={{ fontWeight: 500, color: 'rgb(27, 27, 27) !important', mb: 1, fontSize: '1rem !important', my: 1 }}
          gutterBottom
        >
          Other VIPs (Not Listed)
        </Typography>
        <InputTextFormField
          name={'vip_profile_names'}
          control={control}
          placeholder={'Other VIPs'}
          errors={errors}
          onValueChange={(value) => {
            if (value && value.length > 0) {
              clearErrors('vip_profile_ids');
              handleVipSchemas({
                profileId: z.array(z.string()),
                profileName: z.string(),
              });
            } else {
              handleVipSchemas({
                profileId: z.array(z.string()).min(1, 'Please select at least one VIP or enter a name'),
                profileName: z.string().min(1, 'Please select at least one VIP or enter a name'),
              });
            }
          }}
        />
      </Box>
    );
  };

  return renderVipsForAgent();
};

export default VipOrderForm;
