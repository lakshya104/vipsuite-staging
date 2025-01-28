import React, { useState } from 'react';
import { TextField, TextFieldProps } from '@mui/material';

interface InputFormProps extends Omit<TextFieldProps, 'variant'> {
  placeholder: string;
  type: string;
  autoFill?: boolean;
}

const InputForm = React.forwardRef<HTMLInputElement, InputFormProps>(
  ({ placeholder, autoFill = false, value, type, error, helperText, label, onChange, ...rest }, ref) => {
    const [fieldHasValue, setFieldHasValue] = useState<boolean>(value ? !!value : false);
    const makeAnimationStartHandler =
      // eslint-disable-next-line no-unused-vars
      (stateSetter: (autofilled: boolean) => void) =>
        (e: React.AnimationEvent<HTMLInputElement | HTMLTextAreaElement>) => {
          const autofilled = !!(e.target instanceof Element && e.target.matches('*:-webkit-autofill'));
          if (e.animationName === 'mui-auto-fill' || (e.animationName === 'mui-auto-fill-cancel' && !value)) {
            stateSetter(autofilled);
          }
        };

    return (
      <TextField
        {...rest}
        inputRef={ref}
        sx={{
          '& .MuiFormHelperText-root': {
            color: error ? 'error.main' : 'white',
          },
          '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
            borderColor: error ? 'error.main' : 'white',
          },
          '& .MuiInputLabel-root.Mui-error': {
            color: 'error.main',
          },
          '& input[type=number]': {
            MozAppearance: 'textfield',
            '&::-webkit-outer-spin-button': {
              WebkitAppearance: 'none',
              margin: 0,
            },
            '&::-webkit-inner-spin-button': {
              WebkitAppearance: 'none',
              margin: 0,
            },
          },
        }}
        // inputProps={{
        //   ...(autoFill && {
        //     onAnimationStart: makeAnimationStartHandler(setFieldHasValue),
        //   }),
        // }}
        // InputLabelProps={{
        //   ...(autoFill && {
        //     shrink: fieldHasValue,
        //   }),
        // }}
        slotProps={{
          htmlInput: {
            ...(autoFill && {
              onAnimationStart: makeAnimationStartHandler(setFieldHasValue),
            }),
          },
          inputLabel: {
            ...(autoFill && {
              shrink: fieldHasValue,
            }),
          },
        }}
        {...(autoFill && {
          onFocus: () => setFieldHasValue(true),
          onBlurCapture: () => !value && setFieldHasValue(false),
        })}
        onChange={onChange}
        placeholder={placeholder}
        variant="outlined"
        fullWidth
        type={type}
        error={error}
        helperText={helperText}
        label={label}
        value={value}
      />
    );
  },
);

InputForm.displayName = 'InputForm';

export default InputForm;
