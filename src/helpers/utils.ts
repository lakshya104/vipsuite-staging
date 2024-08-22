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
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      // Recursively apply the function to nested objects
      obj[key] = removeEmptyStrings(obj[key]);

      // If the nested object becomes empty, delete the key
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

export function formatDate(timestamp: string) {
  const date = new Date(timestamp);
  const day = ('0' + date.getDate()).slice(-2);
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
}
