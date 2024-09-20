import React from 'react';
import { FormControl, FormHelperText, MenuItem, Select } from '@mui/material';
import { Control, Controller, FieldErrors, FieldValues, Path } from 'react-hook-form';

type SelectBoxWithoutLabelProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  options: { value: string; label: string }[] | undefined;
  errors: FieldErrors<T>;
  placeholder?: string;
};

const SelectBoxWithoutLabel = <T extends FieldValues>({
  name,
  control,
  options,
  errors,
  placeholder,
}: SelectBoxWithoutLabelProps<T>) => {
  return (
    <FormControl fullWidth error={!!errors[name]}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            value={field.value || ''}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            onChange={(event) => {
              field.onChange(event);
            }}
          >
            <MenuItem value="">{placeholder ? placeholder : 'Select one'}</MenuItem>
            {options?.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        )}
      />{' '}
      <FormHelperText>{errors[name]?.message as string}</FormHelperText>
    </FormControl>
  );
};

export default SelectBoxWithoutLabel;
