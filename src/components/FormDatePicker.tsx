import React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

interface FormDatePickerProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
}

const FormDatePicker = <T extends FieldValues>({ name, control, label }: FormDatePickerProps<T>) => {
  const yesterday = dayjs().subtract(1, 'day');
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            disableFuture
            className="date-picker"
            label={label}
            format="DD/MM/YYYY"
            maxDate={yesterday}
            value={value ? dayjs(value as string) : null}
            onChange={(newValue) => onChange(newValue ? newValue.format('YYYY-MM-DD') : '')}
            slotProps={{
              field: { clearable: true },
              textField: {
                error: !!error,
                helperText: error?.message && 'Please select a date',
              },
            }}
          />
        </LocalizationProvider>
      )}
    />
  );
};

export default FormDatePicker;
