import { escape, join, split, trim } from 'lodash';
import moment from 'moment';

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

export function truncateDescription(description: string, maxLength: number): string {
  const words = description.split(' ');
  if (words.length <= maxLength) {
    return description;
  }
  return words.slice(0, maxLength).join(' ') + '...';
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function removeEmptyStrings(obj: any): any {
  // Iterate over the keys in the object
  for (const key in obj) {
    if (Array.isArray(obj[key])) {
      // If the value is an array, do not modify it (keep empty arrays)
      obj[key] = obj[key].map(removeEmptyStrings);
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      // Recursively apply the function to nested objects
      obj[key] = removeEmptyStrings(obj[key]);

      // If the nested object becomes empty (no keys), delete the key
      if (Object.keys(obj[key]).length === 0) {
        delete obj[key];
      }
    } else if (obj[key] === '') {
      // If the value is an empty string, delete the key
      delete obj[key];
    }
  }
  return obj;
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
  const trimmedContent = trim(content);
  const isHTML = /^<[^>]+>/.test(trimmedContent);

  if (isHTML) {
    return `<p>${trimmedContent
      .replace(/(\r\n|\r|\n){2,}/g, '</p><p>')
      .replace(/^<p>/, '')
      .replace(/<\/p>$/, '')}</p>`;
  } else {
    const paragraphs = split(trimmedContent, /(\r\n|\r|\n){2,}/).map((para) => `<p>${escape(trim(para))}</p>`);
    return join(paragraphs, '');
  }
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
