import { CalendarData } from '@/interfaces/events';
import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

export const WEEKDAY_INDEX: Record<string, number> = {
  sunday: 0,
  sun: 0,
  monday: 1,
  mon: 1,
  tuesday: 2,
  tue: 2,
  tues: 2,
  wednesday: 3,
  wed: 3,
  wedensday: 3,
  thursday: 4,
  thu: 4,
  thur: 4,
  thurs: 4,
  friday: 5,
  fri: 5,
  saturday: 6,
  sat: 6,
};

export const parseSchedulerDate = (value?: string | null): Dayjs | null => {
  if (!value) return null;

  const formats = ['YYYYMMDD', 'YYYY-MM-DD', 'YYYY/MM/DD', 'DD/MM/YYYY', 'DD-MM-YYYY'];
  for (const format of formats) {
    const parsed = dayjs(value, format, true);
    if (parsed.isValid()) return parsed.startOf('day');
  }
  const fallback = dayjs(value);
  return fallback.isValid() ? fallback.startOf('day') : null;
};

export const formatTime = (time: string): string => {
  const twelveHour = dayjs(time, ['hh:mm a', 'hh:mm A', 'h:mm a', 'h:mm A'], true);
  if (twelveHour.isValid()) return twelveHour.format('hh:mm A');

  const twentyFourHour = dayjs(time, ['HH:mm:ss', 'HH:mm'], true);
  if (twentyFourHour.isValid()) return twentyFourHour.format('hh:mm A');

  return time;
};

export const getTimeSlotsForDate = (calendarData: CalendarData, date: dayjs.Dayjs): string[] => {
  if (!calendarData.frequency) return [];

  switch (calendarData.frequency) {
    case 'daily': {
      const timings = calendarData.daily_event_timing ?? [];
      const slots: string[] = [];
      timings.forEach((t: unknown) => {
        const item = t as Record<string, unknown>;
        if (typeof item.event_timings === 'string') {
          slots.push(item.event_timings);
        } else if (Array.isArray(item.event_timings)) {
          item.event_timings.forEach((et: unknown) => {
            const etItem = et as Record<string, unknown>;
            if (typeof etItem.event_time === 'string') slots.push(etItem.event_time);
          });
        } else if (typeof item.event_time === 'string') {
          slots.push(item.event_time);
        }
      });
      return slots;
    }
    case 'weekly': {
      const match = (calendarData.weekly_event_timing ?? []).find(
        (w) => WEEKDAY_INDEX[w.day.toLowerCase()] === date.day(),
      );
      return (match?.event_timings ?? []).map((t) => t.event_time);
    }
    case 'monthly': {
      const match = (calendarData.monthy_event_timings ?? []).find((m) => Number(m.date_of_month) === date.date());
      return (match?.event_timing ?? []).map((t) => t.event_time);
    }
    default:
      return [];
  }
};

export const isCalendarDataActiveOnDate = (calendarData: CalendarData, date: dayjs.Dayjs): boolean => {
  if (!calendarData.frequency) return false;

  const startDate = parseSchedulerDate(calendarData.start_date);
  const endDate = parseSchedulerDate(calendarData.end_date);

  if (startDate && date.isBefore(startDate, 'day')) return false;
  if (endDate && date.isAfter(endDate, 'day')) return false;

  switch (calendarData.frequency) {
    case 'daily':
      return (calendarData.daily_event_timing ?? []).length > 0;
    case 'weekly':
      return (calendarData.weekly_event_timing ?? []).some((w) => WEEKDAY_INDEX[w.day.toLowerCase()] === date.day());
    case 'monthly':
      return (calendarData.monthy_event_timings ?? []).some((m) => Number(m.date_of_month) === date.date());
    default:
      return false;
  }
};

export const normalizeTimeTo24Hour = (time: string): string => {
  const formats = ['hh:mm a', 'hh:mm A', 'h:mm a', 'h:mm A', 'HH:mm:ss', 'HH:mm'];

  for (const format of formats) {
    const parsedTime = dayjs(time, format, true);

    if (parsedTime.isValid()) {
      return parsedTime.format('HH:mm');
    }
  }

  return time;
};
