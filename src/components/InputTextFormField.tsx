/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Control, Controller, FieldErrors, FieldValues, Path } from 'react-hook-form';
import { FormControl, FormHelperText, Input, TextField } from '@mui/material';

interface InputTextFormFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  placeholder: string | undefined;
  errors: FieldErrors<T>;
  noLabel?: boolean;
  autoFill?: boolean;
}

const InputTextFormField = <T extends FieldValues>({
  name,
  control,
  placeholder,
  errors,
  noLabel,
  autoFill = false,
}: InputTextFormFieldProps<T>) => {
  const [fieldHasValue, setFieldHasValue] = useState(autoFill ? false : true);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value } }) => {
        const _onChange = (e: { target: { value: string } }) => {
          onChange(e.target.value);
          setFieldHasValue(e.target.value !== '');
        };
        const makeAnimationStartHandler =
          (stateSetter: (autofilled: boolean) => void) =>
          (e: React.AnimationEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const autofilled = !!(e.target instanceof Element && e.target.matches('*:-webkit-autofill'));
            if (e.animationName === 'mui-auto-fill' || (e.animationName === 'mui-auto-fill-cancel' && !value)) {
              stateSetter(autofilled);
            }
          };
        return (
          <TextField
            fullWidth
            type="text"
            label={!noLabel ? placeholder : undefined}
            placeholder={noLabel ? placeholder : undefined}
            onChange={_onChange}
            onBlur={onBlur}
            value={value}
            error={!!errors[name]}
            helperText={typeof errors[name]?.message === 'string' ? errors[name]?.message : ''}
            sx={{ borderRadius: '50px', '& .MuiOutlinedInput-root': { borderRadius: '50px' } }}
            inputProps={{
              ...(autoFill && {
                onAnimationStart: makeAnimationStartHandler(setFieldHasValue),
              }),
            }}
            InputLabelProps={{
              ...(autoFill && {
                shrink: fieldHasValue,
              }),
            }}
            {...(autoFill && {
              onFocus: () => setFieldHasValue(true),
              onBlurCapture: () => !value && setFieldHasValue(false),
            })}
          />
        );
      }}
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
