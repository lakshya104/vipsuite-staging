/* eslint-disable no-unused-vars */
import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';

interface InputFormProps extends Omit<TextFieldProps, 'variant'> {
  placeholder: string;
  type: string;
}

const InputForm = React.forwardRef<HTMLInputElement, InputFormProps>(
  ({ placeholder, type, error, helperText, label, onChange, ...rest }, ref) => {
    // const [fieldHasValue, setFieldHasValue] = useState<boolean>(value ? !!value : false);
    // const makeAnimationStartHandler =
    //   (stateSetter: (autofilled: boolean) => void) =>
    //   (e: React.AnimationEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    //     const autofilled = !!(e.target instanceof Element && e.target.matches('*:-webkit-autofill'));
    //     if (e.animationName === 'mui-auto-fill' || e.animationName === 'mui-auto-fill-cancel') {
    //       stateSetter(autofilled);
    //     }
    //   };

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
        }}
        // inputProps={{
        //   onAnimationStart: makeAnimationStartHandler(setFieldHasValue),
        // }}
        // InputLabelProps={{
        //   shrink: fieldHasValue,
        // }}
        // onFocus={() => setFieldHasValue(true)}
        // onBlurCapture={() => value && !value && setFieldHasValue(false)}
        onChange={onChange}
        placeholder={placeholder}
        variant="outlined"
        fullWidth
        type={type}
        error={error}
        helperText={helperText}
        label={label}
      />
    );
  },
);

InputForm.displayName = 'InputForm';

export default InputForm;
