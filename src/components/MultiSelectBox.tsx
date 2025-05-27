import React from 'react';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { Control, Controller, FieldErrors, FieldValues, Path } from 'react-hook-form';

type MultiSelectBoxProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  options: { value: string; label: string }[] | undefined;
  errors: FieldErrors<T>;
  placeholder?: string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: string[]) => void;
};

const MultiSelectBox = <T extends FieldValues>({
  name,
  control,
  options,
  errors,
  placeholder,
  onChange,
}: MultiSelectBoxProps<T>) => {
  return (
    <FormControl fullWidth error={!!errors[name]}>
      <InputLabel id={`${name}-label`}>{placeholder}</InputLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            multiple
            value={field.value || []}
            label={placeholder}
            inputProps={{ 'aria-label': placeholder }}
            onChange={(event) => {
              field.onChange(event);
              onChange?.(event.target.value as string[]);
            }}
            onClose={(event) => {
              event.preventDefault();
            }}
          >
            <MenuItem disabled value="">
              {placeholder ? placeholder : 'Select multiple'}
            </MenuItem>
            {options?.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      <FormHelperText>{errors[name]?.message as string}</FormHelperText>
    </FormControl>
  );
};

export default MultiSelectBox;
