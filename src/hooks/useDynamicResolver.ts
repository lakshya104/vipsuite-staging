import { filter, find, isArray, isString, map, reduce } from 'lodash';
import { Section, Question, ACF, ProfileQuestionType } from '@/interfaces';
import { ChildDob } from '@/features/DynamicProfileBuilderStepRenderer';

export function createDynamicResolver(section: Section, profileDetail: ACF, allCityOptions: string[]) {
  return reduce(
    section?.questions as Question[],
    (acc, q) => {
      const profileValue = profileDetail?.[q.unique_id as keyof ACF];
      if (profileValue !== undefined && profileValue !== null) {
        // Helper function to find "Other" option case-insensitively
        const findOtherOption = () => find(q.choices, (choice) => choice.text.toLowerCase() === 'other');
        // Handle multi-select fields with "Other" option
        if (q.input_type === ProfileQuestionType.Dropdown) {
          const choicesTexts = map(q.choices, 'text');
          const otherOption = findOtherOption();

          if (
            otherOption &&
            isString(profileValue) &&
            !choicesTexts.some((text) => text.toLowerCase() === profileValue.toLowerCase())
          ) {
            // Transform to "Other: [value]" format
            acc[q.unique_id] = `Other: ${profileValue}`;
          } else {
            acc[q.unique_id] = profileValue;
          }
        } else if (q.input_type === ProfileQuestionType.CityList) {
          const hasOtherOption = allCityOptions.some((city) => city.toLowerCase() === 'other');
          if (
            hasOtherOption &&
            isString(profileValue) &&
            !allCityOptions.some((city) => city.toLowerCase() === profileValue.toLowerCase())
          ) {
            acc[q.unique_id] = `Other: ${profileValue}`;
          } else {
            acc[q.unique_id] = profileValue;
          }
        } else if (
          (q.input_type === ProfileQuestionType.ButtonGroup && q.max_allowed_choices !== '1') ||
          q.input_type === ProfileQuestionType.Checkboxes
        ) {
          const choicesTexts = map(q.choices, 'text');
          const otherOption = findOtherOption();

          if (otherOption && isArray(profileValue)) {
            // Transform stored values to include "Other" option if needed
            const valuesInChoices = filter(profileValue, (val) =>
              choicesTexts.some((text) => text.toLowerCase() === (val as string)?.toLowerCase()),
            );
            const valuesNotInChoices = filter(
              profileValue,
              (val) => !choicesTexts.some((text) => text.toLowerCase() === (val as string)?.toLowerCase()),
            );

            if (valuesNotInChoices.length > 0) {
              const transformedValue = [...valuesInChoices, otherOption.text];
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
