import { useEffect, useState } from "react";
import { DAYS, MONTHS } from "../../constants";
import {
  generateCalenderDates,
  groupCalendarDatesByWeek,
} from "../../utils/date";
import Picker from "../Picker/Picker";
import styles from "./Calendar.module.css";
import DateButton from "./DateButton";

type CalendarProps = {
  label: string;
  month: number;
  year: number;
  onDateSelect: (date: Date) => void;
  startDate: Date | null;
  endDate: Date | null;
  onMonthYearChange: (value: { month: number; year: number }) => void;
};

const Calendar = ({
  label,
  month,
  year,
  onDateSelect,
  startDate,
  endDate,
  onMonthYearChange,
}: CalendarProps) => {
  const [calendarDates, setCalendarDates] = useState(() =>
    generateCalenderDates(month, year)
  );

  useEffect(() => {
    setCalendarDates(generateCalenderDates(month, year));
  }, [month, year]);

  const dateChangeHandler = (value: { month?: number; year?: number }) => {
    onMonthYearChange({
      month: value.month ?? month,
      year: value.year ?? year,
    });
  };

  const weekDaysContent = DAYS.map((day) => (
    <th scope="col" className={styles["week-days"]} key={day} abbr={day}>
      {day.substring(0, 3).toUpperCase()}
    </th>
  ));

  const calendarDateRows = groupCalendarDatesByWeek(calendarDates);
  console.log("calendarDateRows", calendarDateRows);

  const datesContent = calendarDateRows.map((week, rowIndex) => {
    return (
      <tr key={`week-${rowIndex}`}>
        {week.map((day) => (
          <DateButton
            day={day}
            startDate={startDate}
            endDate={endDate}
            key={day.dateObj.toDateString()}
            onDateSelect={onDateSelect}
          />
        ))}
      </tr>
    );
  });

  return (
    <div className={styles.panel}>
      <label className={styles.label}>{label}</label>
      <Picker month={month} year={year} onSelect={dateChangeHandler} />
      <table className={styles.grid} aria-label={`${MONTHS[month].name} ${year}`}>
        <thead className={styles.week}>
          <tr>{weekDaysContent}</tr>
        </thead>
        <tbody className={styles.dates}>{datesContent}</tbody>
      </table>
    </div>
  );
};

export default Calendar;
