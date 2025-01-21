import { useState } from "react";
import Panel from "../Panel/Panel";
import styles from './DateRangePicker.module.css';
import { formatDateToYYYYMMDD } from "../../utils/date";

export type WeekDayRange = {
  range: [string, string];
  weekends: string[]
};

type DateRangePickerProps = {
  predefinedRanges?: { label: string; range: { startDate: Date; endDate: Date } }[];
  onChange?: (value: WeekDayRange) => void
};

const DateRangePicker = ({ predefinedRanges, onChange }: DateRangePickerProps) => {
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const [selectedRange, setSelectedRange] = useState<WeekDayRange | null>(null);

  const handleDateRangeSelect = (value: { startDate: Date; endDate: Date; weekends: Date[] }) => {
    const formattedRange = {
      range: [`${formatDateToYYYYMMDD(value.startDate)}`, `${formatDateToYYYYMMDD(value.endDate)}`],
      weekends: value.weekends.map((date) => formatDateToYYYYMMDD(date)),
    } as WeekDayRange;
    setSelectedRange(formattedRange);
    setIsPanelVisible(false);
    if(onChange) onChange(formattedRange);
  };

  return (
    <div className={styles["date-range-picker"]}>
    <label htmlFor="date-picker" className={styles["range-label"]}>Date:</label>
      <input
      id="date-picker"
        readOnly
        type="text"
        value={selectedRange ? selectedRange.range.join(' - ') : "Select a date range"}
        onClick={() => setIsPanelVisible((prev) => !prev)}
      />
      {isPanelVisible && (
        <dialog className={styles["panel-wrapper"]} open aria-labelledby="date-picker">
          <Panel
          onDateRangeSelect={handleDateRangeSelect}
          predefinedRanges={predefinedRanges}
          onCancel={() => setIsPanelVisible(false)}
        />
        </dialog>
      )}
    </div>
  );
};

export default DateRangePicker;
