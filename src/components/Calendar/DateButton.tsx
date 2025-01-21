import { CalendarDates } from "../../types";
import { isDateWithinRange } from "../../utils/date";
import styles from "./Calendar.module.css";

type DatesProps = {
  day: CalendarDates;
  startDate: Date | null;
  endDate: Date | null;
  onDateSelect: (date: Date) => void;
};

const DateButton = ({ day, startDate, endDate, onDateSelect }: DatesProps) => {
  const fullDate = day.dateObj.toDateString();
  const currentDate = new Date().toDateString();
  const isHighlighted =
    startDate && endDate && isDateWithinRange(day.dateObj, startDate, endDate);

  const classNames = [
    styles.day,
    fullDate === currentDate && styles.today,
    day.isWeekend && styles.weekend,
    isHighlighted && styles.selected,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <td aria-selected={isHighlighted ? "true" : "false"}>
      <button
        type="button"
        aria-label={fullDate}
        className={classNames}
        disabled={!day.isCurrentMonth || day.isWeekend}
        key={fullDate}
        title={fullDate}
        onClick={() => onDateSelect(day.dateObj)}
      >
        {day.date}
      </button>
    </td>
  );
};

export default DateButton;
