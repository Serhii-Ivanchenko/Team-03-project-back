import { format } from 'date-fns/format';

const getStartOfMonth = (date) => {
  date = new Date(date);
  date = new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0);
  return format(date, 'yyyy-MM-dd');
};

const getEndOfMonth = (date) => {
  date = new Date(date);
  date = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
  return format(date, 'yyyy-MM-dd');
};

export const getMonthDates = (date) => {
  return {
    som: getStartOfMonth(date),
    eom: getEndOfMonth(date),
  };
};

export const getAllDaysInMonth = (date) => {
  date = new Date(date);
  const year = date.getFullYear();
  const month = date.getMonth(); // 0-based index for months
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = [];
  for (let i = 1; i <= daysInMonth; i++) {
    date = new Date(year, month, i);
    days.push(format(date, 'yyyy-MM-dd'));
  }
  return days;
};
