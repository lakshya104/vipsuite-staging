import { Control, Controller, FieldErrors, FieldValues, Path } from 'react-hook-form';
import React from 'react';
import { TextField } from '@mui/material';

interface InputTextFormFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  placeholder: string | undefined;
  errors: FieldErrors<T>;
}

const InputTextFormField = <T extends FieldValues>({
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
        <TextField
          fullWidth
          type="text"
          placeholder={placeholder}
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
