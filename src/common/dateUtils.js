// From the backend, dates are formatted as YYYY-MM-DDTHH:MM:SS.SSSZ

import { format, intlFormat } from 'date-fns';

// Returns date formatted as MM/DD/YYYY
const formatDate = datetime => {
  const date = new Date(datetime);
  try {
    return intlFormat(date);
  } catch {
    return 'Invalid Date';
  }
};

// Returns time formatted as HH:MM (AM/PM)
const formatTime = datetime => {
  const date = new Date(datetime);
  return format(date, 'hh:mm a');
};

export { formatDate, formatTime };
