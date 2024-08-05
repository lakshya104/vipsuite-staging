import React from 'react';
import { FormControl, FormHelperText, MenuItem, Select } from '@mui/material';
import { Control, Controller, FieldErrors, FieldValues, Path } from 'react-hook-form';

type SelectBoxProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  placeholder: string | undefined;
  options: { value: string; label: string }[] | undefined;
  label: string;
  errors: FieldErrors<T>;
  darkMode?: boolean | undefined;
};

const SelectBox = <T extends FieldValues>({
  name,
  control,
  placeholder,
  options,
  label,
  errors,
  darkMode,
}: SelectBoxProps<T>) => {
  return (
    <FormControl fullWidth error={!!errors[name]}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            label={placeholder}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            error={!!errors[name]}
            {...(darkMode && {
              MenuProps: {
                PaperProps: {},
              },
            })}
          >
            <MenuItem value="">{label}</MenuItem>
            {options?.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      {errors[name] && <FormHelperText>{errors[name]?.message as string}</FormHelperText>}
    </FormControl>
  );
};

export default SelectBox;
