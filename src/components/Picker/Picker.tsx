import { ChangeEvent } from "react";
import { MONTHS, YEARS } from "../../constants";
import styles from "./Picker.module.css";

type PickerProps = {
  month: number;
  year: number;
  onSelect: (value: { month?: number; year?: number }) => void;
};

const Picker = ({ month, year, onSelect }: PickerProps) => {
  const handleMonthSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedMonth = Number(event.target.value);
    onSelect({ month: selectedMonth });
  };

  const handleYearSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedYear = Number(event.target.value);
    onSelect({ year: selectedYear });
  };

  return (
    <div className={styles.picker}>
      <div>
        <label htmlFor="month-picker">Month:</label>
        <select
          id="month-picker"
          name="month-picker"
          title="Select Month"
          value={month}
          onChange={handleMonthSelect}
        >
          {MONTHS.map((month) => (
            <option key={month.short} value={month.value}>
              {month.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="year-picker">Year:</label>
        <select
          id="year-picker"
          name="year-picker"
          title="Select Year"
          value={year}
          onChange={handleYearSelect}
        >
          {YEARS.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Picker;
