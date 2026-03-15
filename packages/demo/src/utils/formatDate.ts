import { DateTime } from 'luxon';

export const formatDate = (date: string | Date, locale: string = 'ru') => {
  const dt =
    typeof date === 'string'
      ? DateTime.fromISO(date)
      : DateTime.fromJSDate(date);
  return dt.setLocale(locale).toLocaleString(DateTime.DATE_FULL);
};

export const formatRelativeTime = (date: string | Date) => {
  const dt =
    typeof date === 'string'
      ? DateTime.fromISO(date)
      : DateTime.fromJSDate(date);
  return dt.toRelative();
};
