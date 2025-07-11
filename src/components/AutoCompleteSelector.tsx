import React from 'react';
import { FormControl, Autocomplete, TextField, FormHelperText, Paper, MenuItem, ListItemText } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import CheckIcon from '@mui/icons-material/Check';

interface AutoCompleteSelectorProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  name: string;
  label: string;
  options: string[];
  helperText?: string;
  disabled?: boolean;
  placeholder?: string;
}

const AutoCompleteSelector: React.FC<AutoCompleteSelectorProps> = ({
  control,
  name,
  label,
  options,
  helperText,
  disabled,
  placeholder,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: controllerField, fieldState }) => (
        <FormControl fullWidth error={!!fieldState.error} sx={{ marginBottom: '0 !important' }}>
          <Autocomplete
            className="profile-builder__nationality"
            sx={{ mb: '18px !important' }}
            options={options.map((opt: string) => ({ value: opt, label: opt }))}
            getOptionLabel={(option) => (typeof option === 'string' ? option : option.label)}
            value={
              options
                .map((opt: string) => ({ value: opt, label: opt }))
                .find((option: { value: string; label: string }) => option.value === controllerField.value) || null
            }
            onChange={(_, newValue) => controllerField.onChange(newValue?.value || '')}
            disabled={disabled}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                error={!!fieldState.error}
                placeholder={placeholder}
                sx={{
                  cursor: disabled ? 'not-allowed !important' : 'pointer !important',
                  opacity: disabled ? 0.7 : 1,
                }}
              />
            )}
            renderOption={(props, option, index) => {
              const isSelected = controllerField.value === option.value;
              return (
                <MenuItem {...props} key={`${option.value}${index}`} value={option.value}>
                  <ListItemText primary={option.label} key={`${index}${option.value}`} />
                  {isSelected && (
                    <CheckIcon
                      sx={{
                        marginLeft: 'auto',
                        color: 'primary.main',
                        fontSize: '1.2rem',
                      }}
                    />
                  )}
                </MenuItem>
              );
            }}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            clearOnEscape
            PaperComponent={(props) => (
              <Paper
                {...props}
                sx={{
                  backgroundColor: '#fffff7',
                  boxShadow:
                    '0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)',
                }}
              />
            )}
          />

          <FormHelperText
            sx={{
              mb: 3,
              mt: -6,
              color: fieldState.error ? 'error.main' : 'text.secondary',
            }}
          >
            {fieldState.error ? fieldState.error.message : helperText}
          </FormHelperText>
          {fieldState.error && (
            <FormHelperText
              sx={{
                mb: 2,
                mt: -2.8,
                color: 'text.secondary',
              }}
            >
              {helperText}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
};

export default AutoCompleteSelector;
