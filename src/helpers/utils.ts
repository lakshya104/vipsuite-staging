import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import { z } from 'zod';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { UserRole } from './enums';
import { Session } from '@/interfaces';
import { Question } from '@/interfaces/events';
import en from './lang';

dayjs.extend(relativeTime);
dayjs.extend(utc);

export function calculateAge(dateOfBirth: string | undefined): number {
  if (!dateOfBirth) return 0;
  const today = new Date();
  const birthDate = new Date(dateOfBirth);

  const yearsDiff = today.getFullYear() - birthDate.getFullYear();
  const monthsDiff = today.getMonth() - birthDate.getMonth();
  const daysDiff = today.getDate() - birthDate.getDate();

  if (monthsDiff < 0 || (monthsDiff === 0 && daysDiff < 0)) {
    return yearsDiff - 1;
  }

  return yearsDiff;
}

export function truncateDescription(description?: string, maxLength?: number): string {
  if (!description || !maxLength) return '';
  const words = description.split(' ');
  if (words.length <= maxLength) {
    return description;
  }
  return words.slice(0, maxLength).join(' ') + '...';
}

export function formatDate(timestamp: string | undefined) {
  if (timestamp) {
    const date = new Date(timestamp);
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }
}

export function htmlToPlainText(html: string) {
  const text = html.replace(/<\/?[^>]+>/gi, '');
  return text;
}

export const formatDateWithOrdinal = (date: string | Date, withMonth: boolean): string => {
  const dayjsDate = dayjs(date);
  if (!dayjsDate.isValid()) {
    return 'Invalid Date';
  }

  const getOrdinal = (day: number): string => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };

  const dayOfWeek = dayjsDate.format('dddd');
  const dayOfMonth = dayjsDate.date();
  const month = dayjsDate.format('MMMM');
  const ordinal = getOrdinal(dayOfMonth);

  const formattedDate = withMonth
    ? `${dayOfWeek} ${dayOfMonth}${ordinal} ${month}`
    : `${dayOfWeek} ${dayOfMonth}${ordinal}`;

  return formattedDate;
};

export const wrapInParagraph = (content?: string): string => {
  if (content) {
    const trimmedContent = content.trim();
    const isHTML = /^<[^>]+>/.test(trimmedContent);

    if (isHTML) {
      return `<p>${trimmedContent
        .replace(/(\r\n|\r|\n){2,}/g, '</p><p>')
        .replace(/^<p>/, '')
        .replace(/<\/p>$/, '')}</p>`;
    } else {
      const paragraphs = trimmedContent
        .split(/(\r\n|\r|\n){2,}/)
        .map((para) => `<p>${para.trim()}</p>`)
        .join('');
      return paragraphs;
    }
  } else {
    return '';
  }
};

export const preprocessContent = (html: string | undefined) => {
  if (!html) return '';
  return html.replace(/\n/g, '<br />');
};

export const formatDateWithMonth = (date: string | Date): string => {
  const dayjsDate = dayjs(date);
  if (!dayjsDate.isValid()) {
    return 'Invalid Date';
  }
  const dayOfMonth = dayjsDate.format('D');
  const month = dayjsDate.format('MMM');
  const year = dayjsDate.format('YYYY');
  return `${dayOfMonth} ${month} ${year}`;
};

export const formatEventDates = (date1?: string, date2?: string): string => {
  if (!date1 || !date2) {
    return '';
  }

  const getOrdinal = (day: number): string => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };

  const isSameMonth = dayjs(date1).isSame(dayjs(date2), 'month');
  const day1 = dayjs(date1).date();
  const day2 = dayjs(date2).date();

  const formattedDate1 = isSameMonth
    ? dayjs(date1).format(`dddd D[${getOrdinal(day1)}]`)
    : dayjs(date1).format(`dddd D[${getOrdinal(day1)}] MMMM`);

  const formattedDate2 = dayjs(date2).format(`dddd D[${getOrdinal(day2)}] MMMM`);

  return `${formattedDate1} - ${formattedDate2}`;
};

export const formatString = (str: string) => {
  if (str) {
    return str
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
};

export const getProfileId = (role: UserRole, userId: RequestCookie | undefined, session: Session): number | null => {
  return role === UserRole.Vip || role === UserRole.Brand
    ? Number(session?.profile_id)
    : userId?.value
      ? Number(userId?.value)
      : null;
};

export const getRelativePath = (url: string) => {
  try {
    const parsedUrl = new URL(url);
    return `${parsedUrl.pathname}${parsedUrl.search}${parsedUrl.hash}`;
  } catch (error) {
    console.error('Invalid URL', error);
    return '';
  }
};

export const getLastPathSegment = (url: string) => {
  try {
    const parsedUrl = new URL(url);
    const pathSegments = parsedUrl.pathname.split('/').filter(Boolean);
    return `/${pathSegments.pop()}`;
  } catch {
    return '/';
  }
};

export const isValidEmail = (email: string) => {
  const emailSchema = z.string().email();
  try {
    emailSchema.parse(email);
    return true;
  } catch {
    return false;
  }
};

export const mapQuestionsToSchema = (questions: Question[]) => {
  if (questions) {
    const schema = questions?.reduce(
      (acc, question) => {
        const fieldName = question.title.toLowerCase().replace(/[^a-z0-9]/g, '');
        switch (question.input_type) {
          case 'text':
          case 'textarea':
          case 'dropdown':
          case 'radio':
          case 'date':
          case 'datetime':
          case 'time':
            acc[fieldName] = question.is_required
              ? z.string().min(1, { message: en.common.fieldErrorMessage })
              : z.string().optional().or(z.literal(''));
            break;

          case 'checkboxes':
            acc[fieldName] = question.is_required
              ? z.array(z.string()).min(1, { message: en.common.fieldErrorMessage })
              : z.array(z.string().optional().or(z.literal('')));
            break;

          case 'file_upload':
            acc[fieldName] = question.is_required
              ? z.instanceof(File).refine((val) => val, { message: en.common.fieldErrorMessage })
              : z.union([z.instanceof(File), z.null(), z.string().optional()]);
            break;

          default:
            acc[fieldName] = z.string().optional().or(z.literal(''));
        }

        return acc;
      },
      {} as Record<string, z.ZodType<unknown>>,
    );

    return z.object(schema);
  }
};

export const timeAgo = (date: string) => {
  return dayjs(date).fromNow();
};

export const extractDate = (timestamp: string) => {
  return dayjs(timestamp).format('DD/MM/YYYY');
};

export const calculateRelativeTime = (date: string): string => {
  return dayjs.utc(date).local().startOf('second').fromNow();
};

export const isNonEmptyString = (str: string | undefined | null): boolean => {
  return typeof str === 'string' && str.trim().length > 0;
};

export const expiryDate = (time: number | null): string => {
  if (!time) return '';
  const futureDate = dayjs().add(time, 'second');
  return futureDate.format('YYYY-MM-DD');
};
