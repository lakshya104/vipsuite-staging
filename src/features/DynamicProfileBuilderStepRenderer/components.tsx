import React, { useEffect, useMemo, useRef } from 'react';
import { Control, Controller, FieldErrors, FieldValues } from 'react-hook-form';
import { find, isArray, isEmpty, isString, map, some } from 'lodash';
import {
  Autocomplete,
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  ListItemText,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import SelectBox from '@/components/SelectBox';
import { ProfileQuestionType, Question } from '@/interfaces';
import { ChildDob } from '.';

interface RenderSingleSelectInputProps {
  id: string;
  options: { text: string }[];
  control: Control<FieldValues> | undefined;
  type?: ProfileQuestionType;
}

export const RenderSingleSelectInput: React.FC<RenderSingleSelectInputProps> = ({ id, options, control, type }) => {
  return (
    <Controller
      name={id}
      control={control}
      render={({ field, fieldState }) => {
        const isYesNoQuestion =
          !type && options.some((opt) => opt.text.toLowerCase() === 'yes' || opt.text.toLowerCase() === 'no');
        let currentValue;
        if (isYesNoQuestion) {
          currentValue = typeof field.value === 'boolean' ? (field.value ? 'Yes' : 'No') : field.value;
        } else {
          currentValue = field.value;
        }
        return (
          <FormGroup className="profile-builder__form-group">
            <Box
              className="profile-builder__form-row"
              sx={{ justifyContent: isYesNoQuestion ? 'flex-start !important' : '' }}
            >
              {options.map((choice) => {
                const isChecked = currentValue === choice.text;
                return (
                  <FormControlLabel
                    key={choice.text}
                    control={
                      <Checkbox
                        checked={isChecked}
                        onChange={() => {
                          if (isYesNoQuestion) {
                            field.onChange(choice.text === 'Yes');
                          } else {
                            field.onChange(choice.text);
                          }
                        }}
                      />
                    }
                    label={choice.text}
                    sx={{
                      '& .MuiCheckbox-root.Mui-checked ~ .MuiFormControlLabel-label': {
                        color: 'white !important',
                      },
                    }}
                  />
                );
              })}
            </Box>
            {fieldState.error && (
              <Typography color="error" variant="caption">
                {fieldState.error.message}
              </Typography>
            )}
          </FormGroup>
        );
      }}
    />
  );
};

interface RenderMultiSelectInputProps {
  id: string;
  options: { text: string }[];
  control: Control<FieldValues> | undefined;
  title: string;
  formClassName: string;
  boxClassName?: string;
  maxChoices?: number;
}

export const RenderMultiSelectInput: React.FC<RenderMultiSelectInputProps> = ({
  control,
  formClassName,
  id,
  options,
  title,
  boxClassName,
  maxChoices,
}) => {
  return (
    <Controller
      name={id}
      control={control}
      render={({ field, fieldState }) => {
        const value: string[] = isArray(field.value) ? (field.value as string[]) : [];
        const isMaxReached = maxChoices !== undefined && value.length >= maxChoices;
        const otherOption = find(options, (opt) => opt.text.toLowerCase() === 'other');
        const isOtherSelected =
          otherOption && value.some((val) => typeof val === 'string' && val.toLowerCase() === 'other');
        // Find the custom "Other" value if it exists
        const otherTextValue = value.find((val) => val.startsWith('Other: '))?.replace('Other: ', '') || '';
        return (
          <FormGroup className={formClassName}>
            <Box className={boxClassName && boxClassName}>
              {options.map((choice) => {
                const isChoiceInValue = value.some(
                  (val) => val === choice.text || (choice.text === 'Other' && val.startsWith('Other: ')),
                );
                return (
                  <React.Fragment key={choice.text}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isChoiceInValue}
                          onChange={(e) => {
                            let newValue = [...value];
                            if (e.target.checked) {
                              if (maxChoices !== undefined && newValue.length >= maxChoices) {
                                return;
                              }
                              if (choice.text === 'Other') {
                                if (!newValue.includes('Other')) {
                                  newValue.push('Other');
                                }
                              } else {
                                newValue.push(choice.text);
                              }
                            } else {
                              if (choice.text === 'Other') {
                                // Remove both "Other" and its text value
                                newValue = newValue.filter((v) => v !== 'Other' && !v.startsWith('Other: '));
                              } else {
                                // Remove the option and any existing "Other" value for this option
                                const index = newValue.indexOf(choice.text);
                                if (index > -1) {
                                  newValue.splice(index, 1);
                                }
                              }
                            }
                            field.onChange(newValue);
                          }}
                          disabled={!isChoiceInValue && isMaxReached}
                        />
                      }
                      label={choice.text}
                      sx={{
                        '& .MuiCheckbox-root.Mui-checked ~ .MuiFormControlLabel-label': {
                          color: 'white !important',
                        },
                      }}
                    />
                    {choice.text.toLowerCase() === 'other' && isOtherSelected && (
                      <Box sx={{ mt: 1, p: '0px !important' }}>
                        <TextField
                          sx={{
                            border: 'none !important',
                            minWidth: { xs: '320px', md: '440px !important' },
                            mt: '20px !important',
                          }}
                          slotProps={{
                            inputLabel: {
                              sx: {
                                padding: '0px !important',
                                margin: '0px !important',
                                border: 'none !important',
                              },
                            },
                          }}
                          fullWidth
                          value={otherTextValue}
                          onChange={(e) => {
                            const newText = e.target.value;
                            let newValue = value.filter((v) => !v.startsWith('Other: '));
                            // Keep all selected options except old "Other" values
                            if (newText) {
                              newValue.push(`Other: ${newText}`);
                            }
                            // Always keep "Other" selected if there's text
                            if (newText && !newValue.includes('Other')) {
                              newValue.push('Other');
                            } else if (!newText && newValue.includes('Other')) {
                              // Remove "Other" if no text
                              newValue = newValue.filter((v) => v !== 'Other');
                            }
                            field.onChange(newValue);
                          }}
                          label={`Other ${title}`}
                        />
                      </Box>
                    )}
                  </React.Fragment>
                );
              })}
            </Box>
            {/* {maxChoices !== undefined && (
              <Typography variant="caption" color={isMaxReached ? 'warning' : 'textSecondary'}>
                {isMaxReached
                  ? `Maximum ${maxChoices} selection${maxChoices > 1 ? 's' : ''} reached`
                  : `Select up to ${maxChoices} option${maxChoices > 1 ? 's' : ''}`}
              </Typography>
            )} */}
            {fieldState.error && (
              <Typography
                color="error"
                variant="caption"
                sx={{ mt: fieldState.error.message?.includes('other') ? -4 : -1 }}
              >
                {fieldState.error.message}
              </Typography>
            )}
          </FormGroup>
        );
      }}
    />
  );
};

export const renderHeading = (question: Question) => {
  return (
    <Typography variant="subtitle1" fontWeight={450} gutterBottom>
      {question.question_title}
      {question.validations.includes('required') && ' *'}
    </Typography>
  );
};

interface RenderDropDownProps {
  question: Question;
  control: Control<FieldValues>;
  errors: FieldErrors<FieldValues>;
}

export const RenderDropDown: React.FC<RenderDropDownProps> = ({ question, control, errors }) => {
  const { unique_id: id, question_title: title, choices } = question;
  const commonProps = {
    name: id,
    control,
  };
  const hasOtherOption = some(choices, (choice) => choice.text.toLowerCase() === 'other');
  if (hasOtherOption) {
    return (
      <Box key={id}>
        <Controller
          name={id}
          control={control}
          render={({ field }) => {
            const isOtherSelected =
              isString(field.value) &&
              (field.value.toLowerCase() === 'other' || field.value.toLowerCase().startsWith('other:'));
            const otherTextChoice = find(choices, (c) => c.text.toLowerCase() === 'other')?.text || 'Other';
            const displayValue = isOtherSelected ? otherTextChoice : field.value;
            const otherTextValue =
              isOtherSelected && isString(field.value) ? field.value.split(':').slice(1).join(':').trim() : '';

            return (
              <>
                <SelectBox
                  showSelectOne={true}
                  {...commonProps}
                  options={map(choices, (choice) => ({
                    value: choice.text,
                    label: choice.text,
                  }))}
                  value={displayValue as string}
                  onChange={(value) => {
                    if (value.toLowerCase() === 'other') {
                      field.onChange(`${otherTextChoice}: `);
                    } else {
                      field.onChange(value);
                    }
                  }}
                  label={title}
                  errors={!isOtherSelected ? errors : {}}
                />
                {isOtherSelected && (
                  <TextField
                    fullWidth
                    value={otherTextValue}
                    onChange={(e) => {
                      field.onChange(`${otherTextChoice}: ${e.target.value}`);
                    }}
                    label={`Other ${title}`}
                    sx={{ mt: 2 }}
                    error={!!errors?.[id]}
                    helperText={!!errors?.[id] && 'Please specify the other option'}
                  />
                )}
              </>
            );
          }}
        />
      </Box>
    );
  }
  return (
    <SelectBox
      key={id}
      {...commonProps}
      options={
        !isEmpty(choices)
          ? map(choices, (choice) => ({
              value: choice.text,
              label: choice.text,
            }))
          : []
      }
      label={title}
      errors={errors}
    />
  );
};

interface RenderCityDropDownProps {
  id: string;
  title: string;
  relatedParentId: string;
  control: Control<FieldValues>;
  helperText?: string;
  setValue: import('react-hook-form').UseFormSetValue<FieldValues>;
  parentCountry: string | string[] | ChildDob[];
  options: string[];
  isDisabled: boolean;
  placeholder: string;
}

export const RenderCityDropDown: React.FC<RenderCityDropDownProps> = ({
  id,
  title,
  relatedParentId,
  helperText,
  control,
  setValue,
  parentCountry,
  options,
  isDisabled,
  placeholder,
}) => {
  const prevParentCountryRef = useRef(parentCountry);
  useEffect(() => {
    // Only clear city if parent country was previously set and now cleared
    if (relatedParentId && !parentCountry && prevParentCountryRef.current) {
      setValue(id, null);
    }
    prevParentCountryRef.current = parentCountry;
  }, [parentCountry, id, relatedParentId, setValue]);

  const otherOption = useMemo(() => {
    return options.find((option) => option.toLowerCase() === 'other');
  }, [options]);

  return (
    <Box key={id}>
      <Controller
        name={id}
        control={control}
        render={({ field: controllerField, fieldState }) => {
          const value = controllerField.value;

          const isOtherSelected = isString(value) && (value.toLowerCase() === 'other' || value.startsWith('Other: '));
          const displayValue = isOtherSelected ? otherOption : value;
          const otherTextValue =
            isOtherSelected && isString(value) ? (value.startsWith('Other: ') ? value.replace('Other: ', '') : '') : '';

          return (
            <FormControl fullWidth error={!!fieldState.error} sx={{ marginBottom: '0 !important' }}>
              <Autocomplete
                className="profile-builder__nationality"
                sx={{ mb: '18px !important' }}
                options={options.map((opt: string) => ({ value: opt, label: opt }))}
                getOptionLabel={(option) => (typeof option === 'string' ? option : option.label)}
                value={
                  options
                    .map((opt: string) => ({ value: opt, label: opt }))
                    .find((option: { value: string; label: string }) => option.value === displayValue) || null
                }
                onChange={(_, newValue) => {
                  if (newValue?.value.toLowerCase() === 'other') {
                    // Set to "Other: " to trigger the text field
                    controllerField.onChange('Other: ');
                  } else {
                    controllerField.onChange(newValue?.value || '');
                  }
                }}
                disabled={isDisabled}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={title}
                    error={!!fieldState.error && !fieldState.error.message?.includes('other')}
                    placeholder={placeholder}
                    sx={{
                      cursor: isDisabled ? 'not-allowed !important' : 'pointer !important',
                      opacity: isDisabled ? 0.7 : 1,
                    }}
                  />
                )}
                renderOption={(props, option, index) => {
                  const isSelected = controllerField.value === option.value;
                  return (
                    <MenuItem {...props} key={`${option.value}${index}`} value={option.value}>
                      <ListItemText primary={option.label} key={`${index}${option.value}`} />
                      {isSelected && (
                        <CheckIcon
                          sx={{
                            marginLeft: 'auto',
                            color: 'primary.main',
                            fontSize: '1.2rem',
                          }}
                        />
                      )}
                    </MenuItem>
                  );
                }}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                clearOnEscape
                PaperComponent={(props) => (
                  <Paper
                    {...props}
                    sx={{
                      backgroundColor: '#fffff7',
                      boxShadow:
                        '0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)',
                    }}
                  />
                )}
              />

              <FormHelperText
                sx={{
                  mb: 3,
                  mt: -6,
                  color: fieldState.error ? 'error.main' : 'text.secondary',
                }}
              >
                {fieldState.error && !fieldState.error.message?.includes('other')
                  ? fieldState.error.message
                  : helperText}
              </FormHelperText>
              {fieldState.error && (
                <FormHelperText
                  sx={{
                    mb: 2,
                    mt: -2.8,
                    color: 'text.secondary',
                  }}
                >
                  {helperText}
                </FormHelperText>
              )}
              {isOtherSelected && (
                <TextField
                  fullWidth
                  value={otherTextValue}
                  onChange={(e) => {
                    controllerField.onChange(`Other: ${e.target.value}`);
                  }}
                  label={`Other ${title}`}
                  sx={{ mt: 2 }}
                  error={!!fieldState.error}
                  helperText={!!fieldState.error && 'Please specify the other option'}
                />
              )}
            </FormControl>
          );
        }}
      />
    </Box>
  );
};
