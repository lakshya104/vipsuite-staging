import React from 'react';
import { Control, Controller, FieldErrors, FieldValues, Path } from 'react-hook-form';
import { FormControl, FormHelperText, Input, TextField } from '@mui/material';

interface InputTextFormFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  placeholder: string | undefined;
  errors: FieldErrors<T>;
  noLabel?: boolean;
}

const InputTextFormField = <T extends FieldValues>({
  name,
  control,
  placeholder,
  errors,
  noLabel,
}: InputTextFormFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextField
          fullWidth
          type="text"
          label={!noLabel ? placeholder : undefined}
          placeholder={noLabel ? placeholder : undefined}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          error={!!errors[name]}
          helperText={typeof errors[name]?.message === 'string' ? errors[name]?.message : ''}
          sx={{ borderRadius: '50px', '& .MuiOutlinedInput-root': { borderRadius: '50px' } }}
        />
      )}
    />
  );
};

export default InputTextFormField;

interface InputTextFormFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  placeholder: string | undefined;
  errors: FieldErrors<T>;
}

export const InputTextAreaFormField = <T extends FieldValues>({
  name,
  control,
  placeholder,
  errors,
}: InputTextFormFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <FormControl fullWidth error={!!errors[name]} sx={{ mb: 2 }}>
          <Input
            id={name}
            multiline
            minRows={4}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            placeholder={placeholder}
            sx={{
              borderRadius: '10px',
              padding: '8px',
            }}
          />
          <FormHelperText>{typeof errors[name]?.message === 'string' ? errors[name]?.message : ''}</FormHelperText>
        </FormControl>
      )}
    />
  );
};
