// From the backend, dates are formatted as YYYY-MM-DDTHH:MM:SS.SSSZ

// Returns date formatted as MM/DD/YYYY
const formatDate = datetime => {
  const date = new Date(datetime);
  return date.toLocaleDateString('en-US');
};

// Returns time formatted as HH:MM (AM/PM)
const formatTime = datetime => {
  const date = new Date(datetime);
  const hours = date.getHours() % 12;
  const minutes = date.getMinutes();
  const meridiem = date.getHours() < 12 ? 'AM' : 'PM';
  return `${hours}:${minutes} ${meridiem}`;
};

export { formatDate, formatTime };
