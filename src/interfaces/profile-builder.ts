import { ACF } from '@/interfaces';
export interface ProfileBuilderOptions {
  known_for_options: string[];
  nationality_options: string[];
  ethnicity_options: string[];
  child_age_group_options: string[];
  habits_options: string[];
  sports_play_options: string[];
  sports_follow_options: string[];
  skills_options: string[];
  look_feel_of_socials_options: string[];
  interests_options: string[];
  number_of_childs_options?: string[];
  gender?: object[];
}

export interface ProfileBuilderStepsProps {
  profileBuilderOptions: ProfileBuilderOptions;
  profileDetail: ACF;
  // eslint-disable-next-line no-unused-vars
  onNext: (profileDetail: ACF) => void;
  onPrev: () => void;
  token: string;
  id: number;
}