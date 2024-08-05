import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';

interface InputFormProps extends Omit<TextFieldProps, 'variant'> {
  placeholder: string;
  type: string;
}

const InputForm = React.forwardRef<HTMLInputElement, InputFormProps>(
  ({ placeholder, type, error, helperText, ...rest }, ref) => {
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
        placeholder={placeholder}
        variant="outlined"
        fullWidth
        type={type}
        error={error}
        helperText={helperText}
      />
    );
  },
);

InputForm.displayName = 'InputForm';

export default InputForm;
