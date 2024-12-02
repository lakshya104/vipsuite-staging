import moment from 'moment';
import { UserRole } from './enums';
import { Session } from '@/interfaces';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { z } from 'zod';
import { Question } from '@/interfaces/events';

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
  const momentDate = moment(date);
  if (!momentDate.isValid()) {
    return 'Invalid Date';
  }
  const dayOfWeek = momentDate.format('dddd');
  const dayOfMonth = momentDate.format('Do'); // This includes the ordinal
  const month = momentDate.format('MMMM');
  const foormattedDate = withMonth ? ` ${dayOfWeek} ${dayOfMonth} ${month}` : ` ${dayOfWeek} ${dayOfMonth}`;
  return foormattedDate;
};

export const formatDateWithoutOrdinal = (date: string | Date): string => {
  const momentDate = moment(date);
  if (!momentDate.isValid()) {
    return 'Invalid Date';
  }
  return momentDate.format('DD/MM/YYYY');
};

export const formatDateWithOrdinalAndTime = (date: string | Date): string => {
  const momentDate = moment(date);
  if (!momentDate.isValid()) {
    return 'Invalid Date';
  }
  const dayOfWeek = momentDate.format('dddd');
  const dayOfMonth = momentDate.format('Do');
  const month = momentDate.format('MMMM');
  const time = momentDate.format('h:mma').toLowerCase();
  return ` ${dayOfWeek} ${dayOfMonth} ${month} @ ${time}`;
};

export const wrapInParagraph = (content: string): string => {
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
};

export const preprocessContent = (html: string | undefined) => {
  if (!html) return '';
  return html.replace(/\n/g, '<br />');
};

export const formatDateWithMonth = (date: string | Date): string => {
  const momentDate = moment(date);
  if (!momentDate.isValid()) {
    return 'Invalid Date';
  }
  const dayOfMonth = momentDate.format('D');
  const month = momentDate.format('MMM');
  const year = momentDate.format('YYYY');
  return `${dayOfMonth} ${month} ${year}`;
};

export const formatEventDates = (date1: string, date2: string) => {
  let formatedFinalDates = '';

  const isSameMonth = moment(date1).isSame(date2, 'month');

  const formattedDate1 = isSameMonth ? moment(date1).format('dddd Do') : moment(date1).format('dddd Do MMMM');

  const formattedDate2 = moment(date2).format('dddd Do MMMM');

  if (date1 && date2) {
    formatedFinalDates = `${formattedDate1} - ${formattedDate2}`;
  }
  return formatedFinalDates;
};

export const formatString = (str: string) => {
  if (str) {
    return str
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
};

export const getVipId = (role: UserRole, userId: RequestCookie | undefined, session: Session): number => {
  return role === UserRole.Vip ? Number(session?.vip_profile_id) : Number(userId?.value);
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
  } catch (error) {
    console.error('Invalid URL', error);
    return '';
  }
};

export const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const mapQuestionsToSchema = (questions: Question[]) => {
  const schema = questions.reduce(
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
            ? z.string().min(1, { message: 'This field is required' })
            : z.string().optional().or(z.literal(''));
          break;

        case 'checkboxes':
          acc[fieldName] = question.is_required
            ? z.array(z.string()).min(1, { message: 'This field is required' })
            : z.array(z.string().optional().or(z.literal('')));
          break;

        case 'file_upload':
          acc[fieldName] = question.is_required
            ? z.instanceof(File).refine((val) => val, { message: 'This field is required' })
            : z.instanceof(File).optional();
          break;

        default:
          acc[fieldName] = z.string().optional().or(z.literal(''));
      }

      return acc;
    },
    {} as Record<string, z.ZodType<unknown>>,
  );

  return z.object(schema);
};
