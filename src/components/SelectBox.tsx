/* eslint-disable no-unused-vars */
import React from 'react';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { Control, Controller, FieldErrors, FieldValues, Path } from 'react-hook-form';
import startsWith from 'lodash/startsWith';
import en from '@/helpers/lang';

type SelectBoxProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  placeholder?: string;
  options: { value: string; label: string }[] | undefined;
  label: string;
  errors: FieldErrors<T>;
  getValues?: (name?: Path<T>) => unknown;
  clearErrors?: (name?: Path<T>) => void;
  numberOfChildren?: string;
  onChange?: (value: string) => void;
  value?: string;
  showSelectOne?: boolean;
};

const SelectBox = <T extends FieldValues>({
  name,
  control,
  options,
  label,
  errors,
  getValues,
  clearErrors,
  onChange,
  value,
  showSelectOne,
}: SelectBoxProps<T>) => {
  const hasValue = getValues ? !!getValues(name) : false;
  const hasFieldError = !!errors[name];
  const hasGenderError = startsWith(name, 'genderOfChild') && !!errors.genderOfChild && !hasValue;
  const hasError = hasFieldError || hasGenderError;
  const showFieldError = hasFieldError && !hasValue;
  const showGenderError = hasGenderError && !hasValue;

  return (
    <FormControl fullWidth error={hasError}>
      <InputLabel>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            label={label}
            value={value ? value : field.value || ''}
            inputProps={{ 'aria-label': label }}
            onChange={(event) => {
              field.onChange(event);
              if (event.target.value && clearErrors) {
                clearErrors(name);
              }
              onChange?.(event.target.value);
            }}
          >
            {(!onChange || showSelectOne) && <MenuItem value="">{en.selectBox.selectOne}</MenuItem>}
            {options?.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      {showFieldError && <FormHelperText>{errors[name]?.message as string}</FormHelperText>}
      {showGenderError && !showFieldError && <FormHelperText>{en.selectBox.genderOfChild}</FormHelperText>}
    </FormControl>
  );
};

export default SelectBox;
