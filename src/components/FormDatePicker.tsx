import React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { Control, Controller, FieldValues, Path, RegisterOptions } from 'react-hook-form';
import en from '@/helpers/lang';

interface FormDatePickerProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  rules?: RegisterOptions<T, Path<T>>;
  minDate?: dayjs.Dayjs;
  maxDate?: dayjs.Dayjs;
}

const FormDatePicker = <T extends FieldValues>({
  name,
  control,
  label,
  rules,
  minDate,
  maxDate,
}: FormDatePickerProps<T>) => {
  const getErrorMessage = (dateVal: dayjs.Dayjs) => {
    if (!dateVal.isValid()) return 'Invalid date';

    if (minDate && dateVal.isBefore(minDate)) {
      return `Date must be on or after ${minDate.format('DD/MM/YYYY')}`;
    }

    if (maxDate && dateVal.isAfter(maxDate)) {
      return `Date must be on or before ${maxDate.format('DD/MM/YYYY')}`;
    }

    return null;
  };

  const minMaxValidator = (val: string | number | Date | dayjs.Dayjs | null | undefined) => {
    if (!val) return true;

    const dateVal = dayjs(val);
    return getErrorMessage(dateVal) ?? true;
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        ...(rules ?? {}),
        validate: minMaxValidator,
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const dayjsValue = value ? dayjs(value as string, 'YYYY-MM-DD') : null;

        const uiError = dayjsValue ? getErrorMessage(dayjsValue) : null;

        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              desktopModeMediaQuery="(min-width:0px)"
              className="date-picker"
              label={label}
              format="DD/MM/YYYY"
              minDate={minDate}
              maxDate={maxDate}
              value={dayjsValue}
              onChange={(newValue) => onChange(newValue?.isValid() ? newValue.format('YYYY-MM-DD') : '')}
              slotProps={{
                field: { clearable: true },
                textField: {
                  error: !!error || !!uiError,
                  helperText: uiError || (error?.message && en.common.fieldErrorMessage),
                  FormHelperTextProps: {
                    sx: { mt: 0 },
                  },
                },
              }}
            />
          </LocalizationProvider>
        );
      }}
    />
  );
};

export default FormDatePicker;

export const FormDateTimePicker = <T extends FieldValues>({
  name,
  control,
  label,
  minDate,
  maxDate,
}: FormDatePickerProps<T>) => {
  const getErrorMessage = (dateVal: dayjs.Dayjs) => {
    if (!dateVal.isValid()) return 'Invalid date';

    if (minDate && dateVal.isBefore(minDate)) {
      return `Date and time must be on or after ${minDate.format('DD/MM/YYYY HH:mm')}`;
    }

    if (maxDate && dateVal.isAfter(maxDate)) {
      return `Date and time must be on or before ${maxDate.format('DD/MM/YYYY HH:mm')}`;
    }

    return null;
  };

  const minMaxValidator = (val: string | number | Date | dayjs.Dayjs | null | undefined) => {
    if (!val) return true;

    const dateVal = dayjs(val);
    const error = getErrorMessage(dateVal);

    return error ?? true;
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={{ validate: minMaxValidator }}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const dayjsValue = value ? dayjs(value as string, 'YYYY-MM-DDTHH:mm:ss') : null;

        const uiError = dayjsValue ? getErrorMessage(dayjsValue) : null;

        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              desktopModeMediaQuery="(min-width:0px)"
              className="date-time-picker"
              label={label}
              format="DD/MM/YYYY HH:mm"
              minDateTime={minDate}
              maxDateTime={maxDate}
              value={dayjsValue}
              closeOnSelect={false}
              onChange={(newValue) => onChange(newValue?.isValid() ? newValue.format('YYYY-MM-DDTHH:mm:ss') : '')}
              slotProps={{
                field: { clearable: true },
                textField: {
                  error: !!error || !!uiError,
                  helperText: error?.message || uiError,
                },
              }}
            />
          </LocalizationProvider>
        );
      }}
    />
  );
};

export const FormTimePicker = <T extends FieldValues>({ name, control, label }: FormDatePickerProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            desktopModeMediaQuery="(min-width:0px)"
            className="time-picker"
            label={label && label}
            value={value ? dayjs(value, 'HH:mm:ss') : null}
            onChange={(newValue) => onChange(newValue ? newValue.format('HH:mm:ss') : '')}
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
