import React from 'react';
import {
  FormControl,
  Autocomplete,
  TextField,
  FormHelperText,
  Paper,
  MenuItem,
  ListItemText,
  Box,
} from '@mui/material';
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
  countryCodeOptions?: { label: string; value: string }[];
}

const AutoCompleteSelector: React.FC<AutoCompleteSelectorProps> = ({
  control,
  name,
  label,
  options,
  helperText,
  disabled,
  placeholder,
  countryCodeOptions,
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
            options={
              countryCodeOptions ? countryCodeOptions : options.map((opt: string) => ({ value: opt, label: opt }))
            }
            getOptionLabel={(option) => (typeof option === 'string' ? option : option.label)}
            value={
              countryCodeOptions
                ? countryCodeOptions.find(
                    (option: { value: string; label: string }) => option.value === controllerField.value,
                  ) || null
                : options
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
                  '& .MuiAutocomplete-clearIndicator': {
                    px: '8px',
                    bgcolor: '#fffff7',
                    '&:hover': {
                      bgcolor: '#fffff7',
                    },
                  },
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
                    <Box sx={{ position: 'relative', mr: 1.35 }}>
                      <CheckIcon
                        sx={{
                          position: 'absolute',
                          top: '50%',
                          left: '4%',
                          transform: 'translate(-50%, -50%)',
                          fontSize: '1.2rem',
                          bgcolor: 'rgba(227,227,220,255)',
                          width: '50px',
                          height: '25px',
                        }}
                      />
                    </Box>
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
              mt: countryCodeOptions ? -3.5 : -6,
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
