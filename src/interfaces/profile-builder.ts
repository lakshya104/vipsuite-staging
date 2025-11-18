/* eslint-disable no-unused-vars */
import en from '@/helpers/lang';
import { ACF } from '@/interfaces';
export interface ProfileBuilderOptions {
  representation_options: string[];
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
  content_type_options?: string[];
}

export interface ProfileBuilderStepsProps {
  profileDetail: ACF;
  // eslint-disable-next-line no-unused-vars
  onNext: (profileDetail: ACF) => void;
  onPrev: () => void;
  id: number;
  isAgent?: boolean;
  token?: string;
  profileBuilderData: ProfileBuilderData;
}

export interface QuestionChoice {
  text: string;
}

type ValidationType = 'required' | 'postcode';

type ConditionType = 'has_one_of_values';

export interface ConditionalLogic {
  question_unique_id: string;
  condition: ConditionType;
  question_values: string; // comma-separated values
}

export interface Question {
  unique_id: string;
  question_title: string;
  input_type: ProfileQuestionType;
  choices: QuestionChoice[];
  max_allowed_choices: string;
  validations: ValidationType[];
  apply_conditional_logic: boolean;
  custom_conditional_logic: ConditionalLogic;
  populate_from_country_field: string;
  question_heading?: string;
  question_subheading?: string;
  field_instructions?: string;
}

export interface Section {
  section_title: string;
  section_description: string;
  specific_section_type: SectionType;
  questions: Question[];
  additional_contacts_content: AdditionalContactContent;
}

export interface ProfileBuilderData {
  sections: Section[];
  uk_countries: string[];
  us_countries: string[];
  eu_countries: string[];
  other_countries: string[];
  uk_cities: string[];
  us_cities: string[];
  eu_cities: string[];
  other_cities: string[];
  representation_options: string[];
}

export enum ProfileQuestionType {
  ButtonGroup = 'button-group',
  Dropdown = 'dropdown',
  Text = 'text',
  Checkboxes = 'checkboxes',
  DatePicker = 'date',
  CountryList = 'country',
  CityList = 'city',
  Radio = 'true-false',
  KidsAge = 'kids-info',
}

export enum SectionType {
  Basic = 'basic',
  AdditionalContacts = 'additional-contacts',
  YourDetails = 'your-details',
}

export interface AdditionalContactContent {
  events_field_label: string;
  events_field_description: string;
  stylist_field_label: string;
  stylist_field_description: string;
  gifting_field_label: string;
  gifting_field_description: string;
}

export const dobField: Question = {
  unique_id: 'date_of_birth',
  question_title: 'Date of Birth',
  input_type: ProfileQuestionType.DatePicker,
  populate_from_country_field: '',
  choices: [],
  max_allowed_choices: '',
  validations: ['required'],
  apply_conditional_logic: false,
  custom_conditional_logic: {
    condition: 'has_one_of_values',
    question_unique_id: '',
    question_values: '',
  },
};

export const vipSectionData = (options: string[]): Section => {
  return {
    section_title: 'Add VIP',
    specific_section_type: SectionType.Basic,
    section_description: '',
    questions: [
      {
        unique_id: 'first_name',
        question_title: 'First Name',
        input_type: ProfileQuestionType.Text,
        populate_from_country_field: '',
        choices: [],
        max_allowed_choices: '',
        validations: ['required'],
        apply_conditional_logic: false,
        custom_conditional_logic: {
          question_unique_id: '',
          condition: 'has_one_of_values',
          question_values: '',
        },
      },
      {
        unique_id: 'last_name',
        question_title: 'Last Name',
        input_type: ProfileQuestionType.Text,
        populate_from_country_field: '',
        choices: [],
        max_allowed_choices: '',
        validations: ['required'],
        apply_conditional_logic: false,
        custom_conditional_logic: {
          question_unique_id: '',
          condition: 'has_one_of_values',
          question_values: '',
        },
      },
      {
        unique_id: 'type_of_representation',
        question_title: 'Type of Representation',
        input_type: ProfileQuestionType.Dropdown,
        populate_from_country_field: '',
        choices: options.map((option) => ({ text: option })),
        max_allowed_choices: '',
        validations: ['required'],
        apply_conditional_logic: false,
        custom_conditional_logic: {
          question_unique_id: '',
          condition: 'has_one_of_values',
          question_values: '',
        },
      },
      {
        unique_id: 'instagram_handle',
        question_title: 'Instagram',
        input_type: ProfileQuestionType.Text,
        populate_from_country_field: '',
        choices: [],
        max_allowed_choices: '',
        validations: [],
        apply_conditional_logic: false,
        custom_conditional_logic: {
          question_unique_id: '',
          condition: 'has_one_of_values',
          question_values: '',
        },
        field_instructions: en.signUpForm.socialHandleHelper,
      },
      {
        unique_id: 'tiktok_handle',
        question_title: 'TikTok',
        input_type: ProfileQuestionType.Text,
        populate_from_country_field: '',
        choices: [],
        max_allowed_choices: '',
        validations: [],
        apply_conditional_logic: false,
        custom_conditional_logic: {
          question_unique_id: '',
          condition: 'has_one_of_values',
          question_values: '',
        },
        field_instructions: en.signUpForm.socialHandleHelper,
      },
      {
        unique_id: 'avg_engagement_instagram',
        question_title: 'Avg. Instagram Engagement',
        question_heading: 'Avg. engagement for Paid posts',
        question_subheading: 'Please include both Instagram & TikTok',
        input_type: ProfileQuestionType.Text,
        populate_from_country_field: '',
        choices: [],
        max_allowed_choices: '',
        validations: [],
        apply_conditional_logic: false,
        custom_conditional_logic: {
          question_unique_id: '',
          condition: 'has_one_of_values',
          question_values: '',
        },
      },
      {
        unique_id: 'avg_engagement_tiktok',
        question_title: 'Avg. TikTok Engagement',
        input_type: ProfileQuestionType.Text,
        populate_from_country_field: '',
        choices: [],
        max_allowed_choices: '',
        validations: [],
        apply_conditional_logic: false,
        custom_conditional_logic: {
          question_unique_id: '',
          condition: 'has_one_of_values',
          question_values: '',
        },
      },
    ],
    additional_contacts_content: {
      events_field_description: '',
      events_field_label: '',
      gifting_field_description: '',
      gifting_field_label: '',
      stylist_field_description: '',
      stylist_field_label: '',
    },
  };
};
