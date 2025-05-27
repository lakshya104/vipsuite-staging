export interface VipOptions {
  value: string;
  label: string;
}

export interface VipApiResponse {
  profile_id: number;
  first_name: string;
  last_name: string;
}

export interface AgentVipsPayload {
  vip_profile_ids?: string;
  vip_profile_names?: string;
}
