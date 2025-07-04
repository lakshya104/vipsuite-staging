import { filter, find, isArray, isString, map, reduce } from 'lodash';
import { Section, Question, ACF, ProfileQuestionType } from '@/interfaces';
import { ChildDob } from '@/features/DynamicProfileBuilderStepRenderer';

export function createDynamicResolver(section: Section, profileDetail: ACF) {
  return reduce(
    section?.questions as Question[],
    (acc, q) => {
      const profileValue = profileDetail?.[q.unique_id as keyof ACF];
      if (profileValue !== undefined && profileValue !== null) {
        // Handle multi-select fields with "Other" option
        if (q.input_type === ProfileQuestionType.Dropdown) {
          const choicesTexts = map(q.choices, 'text');
          const otherOption = find(q.choices, (choice) => choice.text === 'Other');
          if (otherOption && isString(profileValue) && !choicesTexts.includes(profileValue)) {
            // Transform to "Other: [value]" format
            acc[q.unique_id] = `Other: ${profileValue}`;
          } else {
            acc[q.unique_id] = profileValue;
          }
        } else if (
          (q.input_type === ProfileQuestionType.ButtonGroup && q.max_allowed_choices !== '1') ||
          q.input_type === ProfileQuestionType.Checkboxes
        ) {
          const choicesTexts = map(q.choices, 'text');
          const otherOption = find(q.choices, (choice) => choice.text === 'Other');

          if (otherOption && isArray(profileValue)) {
            // Transform stored values to include "Other" option if needed
            const valuesInChoices = filter(profileValue, (val) => choicesTexts.includes(val as string));
            const valuesNotInChoices = filter(profileValue, (val) => !choicesTexts.includes(val as string));

            if (valuesNotInChoices.length > 0) {
              const transformedValue = [...valuesInChoices, 'Other'];
              // Add "Other: " prefix for the first custom value
              if (valuesNotInChoices[0]) {
                transformedValue.push(`Other: ${valuesNotInChoices[0]}`);
              }
              acc[q.unique_id] = transformedValue;
            } else {
              acc[q.unique_id] = profileValue;
            }
          } else {
            acc[q.unique_id] = profileValue;
          }
        } else {
          acc[q.unique_id] = profileValue;
        }
      } else {
        if (q.input_type === ProfileQuestionType.ButtonGroup) {
          if (q.max_allowed_choices !== '1') {
            acc[q.unique_id] = [];
          } else {
            acc[q.unique_id] = '';
          }
        } else if (q.input_type === ProfileQuestionType.Checkboxes) {
          acc[q.unique_id] = [];
        } else if (
          q.input_type === ProfileQuestionType.Text ||
          q.input_type === ProfileQuestionType.Dropdown ||
          q.input_type === ProfileQuestionType.CountryList
        ) {
          acc[q.unique_id] = '';
        } else if (q.input_type === ProfileQuestionType.KidsAge) {
          acc[q.unique_id] = [{ date_of_birth: '' }];
        } else if (q.input_type === ProfileQuestionType.Radio) {
          acc[q.unique_id] = null;
        } else {
          acc[q.unique_id] = '';
        }
      }
      return acc;
    },
    {} as Record<string, string | string[] | ChildDob[] | null>,
  );
}
