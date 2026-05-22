'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Question } from '@/interfaces/events';
import en from '@/helpers/lang';
import './SchedulerCalendar.scss';
import {
  getTimeSlotsForDate,
  isCalendarDataActiveOnDate,
  normalizeTimeTo24Hour,
  parseSchedulerDate,
  WEEKDAY_INDEX,
} from './utils';
import { FieldError } from 'react-hook-form';

dayjs.extend(customParseFormat);

interface SchedulerCalendarProps {
  question: Question;
  value: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string) => void;
  error?: FieldError | undefined;
}

const SchedulerCalendar: React.FC<SchedulerCalendarProps> = ({ question, value, onChange, error }) => {
  const calendarQuestions = useMemo(() => [question], [question]);
  const today = useMemo(() => dayjs().startOf('day'), []);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Sync external value → internal state only (never write '' back to the form)
  useEffect(() => {
    if (value) {
      const parts = value.split(/[ T]/);
      if (parts[0]) setSelectedDate(parts[0]);
      if (parts[1]) setSelectedTime(normalizeTimeTo24Hour(parts[1]));
    } else {
      setSelectedTime(null);
    }
  }, [value]);

  const { minDate, maxDate, hasOpenEndedSchedule } = useMemo(() => {
    let minDate: dayjs.Dayjs | null = null;
    let maxDate: dayjs.Dayjs | null = null;
    let hasOpenEndedSchedule = false;

    calendarQuestions.forEach((q) => {
      const data = q.calendar_data;
      const startDate = parseSchedulerDate(data?.start_date);
      const endDate = parseSchedulerDate(data?.end_date);

      if (startDate && (!minDate || startDate.isBefore(minDate))) {
        minDate = startDate.clone();
      }
      if (endDate && (!maxDate || endDate.isAfter(maxDate))) {
        maxDate = endDate.clone();
      }
      if (!endDate) hasOpenEndedSchedule = true;
    });

    return { minDate, maxDate, hasOpenEndedSchedule };
  }, [calendarQuestions]);

  const { firstVisibleMonth, generationEndDate, lastVisibleMonth } = useMemo(() => {
    const rawFirstMonth = ((minDate as dayjs.Dayjs | null) ?? today).clone().startOf('month');
    const firstVisibleMonth = rawFirstMonth.isBefore(today, 'month') ? today.clone().startOf('month') : rawFirstMonth;

    const generationEndDate = maxDate
      ? (maxDate as dayjs.Dayjs).clone()
      : firstVisibleMonth.clone().add(11, 'months').endOf('month');

    const lastVisibleMonth = hasOpenEndedSchedule
      ? today.clone().add(10, 'years').startOf('month')
      : maxDate
        ? (maxDate as dayjs.Dayjs).clone().startOf('month')
        : firstVisibleMonth.clone();

    return { firstVisibleMonth, generationEndDate, lastVisibleMonth };
  }, [minDate, maxDate, hasOpenEndedSchedule, today]);

  const [visibleMonth, setVisibleMonth] = useState(() => firstVisibleMonth);

  // Only reset visibleMonth when the schedule range actually changes (e.g. question prop swapped)
  const firstVisibleMonthKey = firstVisibleMonth.format('YYYY-MM');
  useEffect(() => {
    setVisibleMonth(dayjs(firstVisibleMonthKey, 'YYYY-MM').startOf('month'));
  }, [firstVisibleMonthKey]);

  const isActiveOnDate = useCallback((q: Question, date: dayjs.Dayjs): boolean => {
    if (q.calendar_data) {
      return isCalendarDataActiveOnDate(q.calendar_data, date);
    }
    const schedule = q.scheduler_fields;
    if (!schedule?.frequency) return false;
    const startDate = parseSchedulerDate(schedule.start_date ?? q.start_date);
    const endDate = parseSchedulerDate(schedule.end_date ?? q.end_date);
    if (startDate && date.isBefore(startDate, 'day')) return false;
    if (endDate && date.isAfter(endDate, 'day')) return false;
    switch (schedule.frequency) {
      case 'daily':
        return true;
      case 'weekly': {
        const activeWeekdays = (schedule.weekdays ?? [])
          .map((w) => WEEKDAY_INDEX[w.toLowerCase()])
          .filter((w): w is number => w !== undefined);
        return activeWeekdays.includes(date.day());
      }
      case 'monthly': {
        const activeMonthDays = (schedule.month_days ?? [])
          .map(Number)
          .filter((d) => Number.isInteger(d) && d >= 1 && d <= 31);
        return activeMonthDays.includes(date.date());
      }
      default:
        return false;
    }
  }, []);

  const handleDayPress = (dateStr: string) => {
    setSelectedDate(dateStr);
    setSelectedTime(null);
    onChange('');
  };

  const handleTimePress = (timeStr: string) => {
    const normalized = normalizeTimeTo24Hour(timeStr);
    setSelectedTime(normalized);
    if (selectedDate) {
      onChange(`${selectedDate} ${normalized}`);
    }
  };

  const markedDates = useMemo(() => {
    const result: Record<string, { isActive: boolean; isSelected: boolean }> = {};

    const windowStart = hasOpenEndedSchedule
      ? visibleMonth.clone().subtract(1, 'month').startOf('month').isBefore(today)
        ? today.clone()
        : visibleMonth.clone().subtract(1, 'month').startOf('month')
      : today.clone();

    const windowEnd = hasOpenEndedSchedule
      ? visibleMonth.clone().add(2, 'months').endOf('month')
      : generationEndDate.clone();

    let cursorDate = windowStart.clone();
    let safetyCounter = 0;

    while (!cursorDate.isAfter(windowEnd, 'day') && safetyCounter < 1000) {
      safetyCounter++;
      if (!cursorDate.isValid() || !windowEnd.isValid()) {
        break;
      }
      const dateStr = cursorDate.format('YYYY-MM-DD');
      const isActive = calendarQuestions.some((q) => isActiveOnDate(q, cursorDate));

      if (isActive) {
        result[dateStr] = {
          isActive: true,
          isSelected: dateStr === selectedDate,
        };
      }

      cursorDate = cursorDate.add(1, 'day');
    }

    return result;
  }, [selectedDate, visibleMonth, hasOpenEndedSchedule, today, generationEndDate, calendarQuestions, isActiveOnDate]);

  const availableTimeSlots = useMemo((): string[] => {
    if (!selectedDate) return [];
    const date = dayjs(selectedDate, 'YYYY-MM-DD');
    const allSlots = new Set<string>();

    calendarQuestions.forEach((q) => {
      if (!isActiveOnDate(q, date)) return;
      if (q.calendar_data) {
        getTimeSlotsForDate(q.calendar_data, date).forEach((t) => {
          allSlots.add(normalizeTimeTo24Hour(t));
        });
      }
    });

    return Array.from(allSlots).sort();
  }, [selectedDate, calendarQuestions, isActiveOnDate]);

  const canGoToPreviousMonth = visibleMonth.isAfter(firstVisibleMonth, 'month');
  const canGoToNextMonth = hasOpenEndedSchedule ? true : visibleMonth.isBefore(lastVisibleMonth, 'month');

  const startWeekday = visibleMonth.startOf('month').day();
  const daysInMonth = visibleMonth.daysInMonth();

  const dayCells = useMemo(() => {
    const cells: (dayjs.Dayjs | null)[] = [];
    for (let i = 0; i < startWeekday; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(visibleMonth.date(d));
    return cells;
  }, [visibleMonth, startWeekday, daysInMonth]);

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.preventDefault();
    if (canGoToPreviousMonth) {
      setVisibleMonth((prev) => prev.subtract(1, 'month'));
      setSelectedDate(null);
      setSelectedTime(null);
      onChange('');
    }
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.preventDefault();
    if (canGoToNextMonth) {
      setVisibleMonth((prev) => prev.add(1, 'month'));
      setSelectedDate(null);
      setSelectedTime(null);
      onChange('');
    }
  };

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <Box className={`scheduler-calendar${error ? ' Ui-error' : ''}`}>
      <Box className="scheduler-calendar__header">
        <button
          onClick={handlePrevMonth}
          disabled={!canGoToPreviousMonth}
          aria-label="Previous Month"
          className="scheduler-calendar__header-nav-btn"
        >
          <ChevronLeftIcon fontSize="small" />
        </button>

        <Typography className="scheduler-calendar__header-title">{visibleMonth.format('MMMM YYYY')}</Typography>

        <button
          onClick={handleNextMonth}
          disabled={!canGoToNextMonth}
          aria-label="Next Month"
          className="scheduler-calendar__header-nav-btn"
        >
          <ChevronRightIcon fontSize="small" />
        </button>
      </Box>

      <Box className="scheduler-calendar__weekdays">
        {weekdays.map((day) => (
          <Box key={day} className="scheduler-calendar__weekdays-day">
            {day}
          </Box>
        ))}
      </Box>

      <Box className="scheduler-calendar__days">
        {dayCells.map((date, index) => {
          if (!date) {
            return <Box key={`empty-${index}`} className="scheduler-calendar__days-cell" />;
          }

          const dateStr = date.format('YYYY-MM-DD');
          const marking = markedDates[dateStr];
          const isActive = marking?.isActive ?? false;
          const isSelected = dateStr === selectedDate;
          const isDisabled = !isActive || date.isBefore(today, 'day');

          let btnClass = 'scheduler-calendar__days-day';
          if (isActive) btnClass += ' scheduler-calendar__days-day--active';
          if (isSelected) btnClass += ' scheduler-calendar__days-day--selected';
          if (isDisabled) btnClass += ' scheduler-calendar__days-day--disabled';

          return (
            <Box key={dateStr} className="scheduler-calendar__days-cell">
              <button
                type="button"
                className={btnClass}
                disabled={isDisabled}
                onClick={(e) => {
                  e.preventDefault();
                  handleDayPress(dateStr);
                }}
              >
                {date.date()}
              </button>
            </Box>
          );
        })}
      </Box>

      {selectedDate && availableTimeSlots.length > 0 && (
        <Box className="scheduler-calendar__time-slots">
          <Box className="scheduler-calendar__time-slots-list">
            {availableTimeSlots.map((time, index) => {
              const isSelected = selectedTime === time;
              let itemClass = 'scheduler-calendar__time-slots-item';
              if (isSelected) itemClass += ' scheduler-calendar__time-slots-item--selected';

              return (
                <Box
                  key={`${time}-${index}`}
                  className={itemClass}
                  onClick={(e) => {
                    e.preventDefault();
                    handleTimePress(time);
                  }}
                >
                  <Box className="scheduler-calendar__time-slots-item-info">
                    <Box className="scheduler-calendar__time-slots-item-dot" />
                    <Box className="scheduler-calendar__time-slots-item-badge">
                      <span>{dayjs(selectedDate).format('D')}</span>
                      <span>{dayjs(selectedDate).format('ddd')}</span>
                    </Box>
                    <Box className="scheduler-calendar__time-slots-item-details">
                      <span className="scheduler-calendar__time-slots-item-title-text">{question.title}</span>
                      <span className="scheduler-calendar__time-slots-item-time-text">
                        {normalizeTimeTo24Hour(time)}
                      </span>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      )}

      {error && (
        <Typography className="field-error Mui-error" color="error" sx={{ mt: 1 }}>
          {error.message || en.common.fieldErrorMessage}
        </Typography>
      )}
    </Box>
  );
};

export default SchedulerCalendar;
