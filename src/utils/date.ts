import { DAYS } from "../constants";
import { CalendarDates } from "../types";

export const generateCalenderDates = (
  monthIndex: number,
  year: number
): CalendarDates[] => {
  const firstDate = new Date(year, monthIndex, 1);
  const lastDate = new Date(year, monthIndex + 1, 0);
  const previousMonthLastDate = new Date(year, monthIndex, 0).getDate();
  const totalDays = lastDate.getDate();
  const firstDayIndex = firstDate.getDay(); // gives the index of the day (Sunday = 0, Monday = 1...)
  const lastDayIndex = lastDate.getDay();
  const weekDays = DAYS.length - 1;
  const nextMonthIndex = monthIndex === 11 ? 0 : monthIndex + 1;
  const previousMonthIndex = monthIndex === 0 ? 11 : monthIndex - 1;
  const previousMonthYear = monthIndex === 0 ? year - 1 : year;
  const nextMonthYear = monthIndex === 11 ? year + 1 : year;
  const daysFromPreviousMonth = firstDayIndex; // starting offset days from previous month if first day isn't Sunday
  const daysFromNextMonth = weekDays - lastDayIndex; // ending offset days from next month if last day isn't Satuday

  const currentMonthDates = Array.from({ length: totalDays }, (_, index) => {
    const date = index + 1;
    const dateObj = new Date(year, monthIndex, date);
    const day = dateObj.getDay();
    const isWeekend = day === 0 || day === 6;

    return {
      date,
      isCurrentMonth: true,
      month: monthIndex,
      dateObj,
      isWeekend,
    };
  });

  const previousMonthDates = Array.from(
    { length: daysFromPreviousMonth },
    (_, index) => {
      const date = previousMonthLastDate - daysFromPreviousMonth + index + 1;
      const dateObj = new Date(previousMonthYear, previousMonthIndex, date);
      const day = dateObj.getDay();
      const isWeekend = day === 0 || day === 6;

      return {
        date,
        isCurrentMonth: false,
        month: previousMonthIndex,
        dateObj,
        isWeekend,
      };
    }
  );

  const nextMonthDates = Array.from(
    { length: daysFromNextMonth },
    (_, index) => {
      const date = index + 1;
      const dateObj = new Date(nextMonthYear, nextMonthIndex, date);
      const day = dateObj.getDay();
      const isWeekend = day === 0 || day === 6;

      return {
        date,
        isCurrentMonth: false,
        month: nextMonthIndex,
        dateObj,
        isWeekend,
      };
    }
  );

  return [...previousMonthDates, ...currentMonthDates, ...nextMonthDates];
};

export const isWeekend = (date: Date) => {
  const day = date.getDay();
  return day === 0 || day === 6;
};

export const isDateWithinRange = (
  date: Date,
  startDate: Date,
  endDate: Date
) => {
  if (!startDate || !endDate) return false;
  return date >= startDate && date <= endDate && !isWeekend(date);
};

export const getWeekendsInRange = (start: Date, end: Date): Date[] => {
  const weekends: Date[] = [];
  const current = new Date(start);
  while (current <= end) {
    if (isWeekend(current)) {
      weekends.push(new Date(current));
    }
    current.setDate(current.getDate() + 1);
  }
  return weekends;
};

export const formatDateToYYYYMMDD = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const groupCalendarDatesByWeek = (dates: CalendarDates[]) => {
  const groupedDates = [];

  for (let i = 0; i < dates.length; i += 7) {
    groupedDates.push(dates.slice(i, i + 7));
  }

  return groupedDates;
};
