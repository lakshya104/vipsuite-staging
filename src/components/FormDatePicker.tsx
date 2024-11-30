import React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

interface FormDatePickerProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  selectFutureDate?: boolean;
}

const FormDatePicker = <T extends FieldValues>({ name, control, label, selectFutureDate }: FormDatePickerProps<T>) => {
  const yesterday = dayjs().subtract(1, 'day');
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            disableFuture={selectFutureDate ? false : true}
            className="date-picker"
            label={label && label}
            format="DD/MM/YYYY"
            maxDate={selectFutureDate ? undefined : yesterday}
            value={value ? dayjs(value as string) : null}
            onChange={(newValue) => onChange(newValue ? newValue.format('YYYY-MM-DD') : '')}
            slotProps={{
              field: { clearable: true },
              textField: {
                error: !!error,
                helperText: error?.message && 'This field is required',
              },
            }}
          />
        </LocalizationProvider>
      )}
    />
  );
};

export default FormDatePicker;

interface FormDateTimePickerProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  selectFutureDate?: boolean;
}

export const FormDateTimePicker = <T extends FieldValues>({
  name,
  control,
  label,
  selectFutureDate,
}: FormDateTimePickerProps<T>) => {
  const yesterday = dayjs().subtract(1, 'day');

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            disableFuture={selectFutureDate ? false : true}
            className="date-time-picker"
            label={label && label}
            format="DD/MM/YYYY HH:mm"
            maxDate={selectFutureDate ? undefined : yesterday}
            value={value ? dayjs(value as string) : null}
            onChange={(newValue) => onChange(newValue ? newValue.format('YYYY-MM-DDTHH:mm:ss') : '')}
            slotProps={{
              field: { clearable: true },
              textField: {
                error: !!error,
                helperText: error?.message,
              },
            }}
          />
        </LocalizationProvider>
      )}
    />
  );
};

interface FormTimePickerProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
}

export const FormTimePicker = <T extends FieldValues>({ name, control, label }: FormTimePickerProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            className="time-picker"
            label={label && label}
            value={value ? dayjs(value as string) : null}
            onChange={(newValue) => onChange(newValue ? newValue.format('HH:mm:ss') : '')}
            slotProps={{
              textField: {
                error: !!error,
                helperText: error?.message,
              },
            }}
          />
        </LocalizationProvider>
      )}
    />
  );
};
