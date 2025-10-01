import { z } from 'zod';

export interface VipOptions {
  value: string;
  label: string;
}

export interface VipApiResponse {
  profile_id: number;
  first_name: string;
  last_name: string;
  is_profile_completed?: number;
}

export interface AgentVipsPayload {
  vip_profile_ids?: string;
  vip_profile_names?: string;
}

export const vipInitialSchema = {
  profileId: z.array(z.string()).min(1, 'Please select at least one VIP or enter a name'),
  profileName: z.string().min(1, 'Please select at least one VIP or enter a name'),
};

export const vipOptionalSchema = {
  profileId: z.array(z.string()),
  profileName: z.string(),
};
