import { useState } from "react";
import Calendar from "../Calendar/Calendar";
import styles from "./Panel.module.css";
import { getWeekendsInRange, isWeekend } from "../../utils/date";

type PanelProps = {
  onDateRangeSelect: (range: {
    startDate: Date;
    endDate: Date;
    weekends: Date[];
  }) => void;
  predefinedRanges?: {
    label: string;
    range: { startDate: Date; endDate: Date };
  }[];
  onCancel?: () => void
};

const Panel = ({ onDateRangeSelect, predefinedRanges, onCancel }: PanelProps) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [firstCalendarDate, setFirstCalendarDate] = useState(new Date());
  const [secondCalendarDate, setSecondCalendarDate] = useState(
    new Date(
      firstCalendarDate.getFullYear(),
      firstCalendarDate.getMonth() + 1,
      1
    )
  );

  const handleDateSelect = (selectedDate: Date) => {
    if (isWeekend(selectedDate)) {
      alert("Weekends cannot be selected.");
      return;
    }

    if (!startDate || (startDate && endDate)) {
      setStartDate(selectedDate);
      setEndDate(null);
    } else if (selectedDate > startDate) {
      setEndDate(selectedDate);
    } else {
      setStartDate(selectedDate);
    }
  };

  const handleFirstCalendarChange = (value: {
    month: number;
    year: number;
  }) => {
    setFirstCalendarDate(new Date(value.year, value.month, 1));
    setSecondCalendarDate(new Date(value.year, value.month + 1, 1));
  };

  const handleSecondCalendarChange = (value: {
    month: number;
    year: number;
  }) => {
    setSecondCalendarDate(new Date(value.year, value.month, 1));
  };

  const handleOk = () => {
    if (startDate && endDate) {
      const weekends = getWeekendsInRange(startDate, endDate);
      onDateRangeSelect({ startDate, endDate, weekends });
    }
  };

  const handleCancel = () => {
    setStartDate(null);
    setEndDate(null);
    if(onCancel) onCancel();
  };

  const handlePredefinedRangeSelect = (range: {
    startDate: Date;
    endDate: Date;
  }) => {
    setStartDate(range.startDate);
    setEndDate(range.endDate);
  };

  return (
   <div>
     <div className={styles["range-picker"]}>
      <Calendar
        label="From:"
        month={firstCalendarDate.getMonth()}
        year={firstCalendarDate.getFullYear()}
        startDate={startDate}
        endDate={endDate}
        onDateSelect={handleDateSelect}
        onMonthYearChange={handleFirstCalendarChange}
      />
      <Calendar
        label="To:"
        month={secondCalendarDate.getMonth()}
        year={secondCalendarDate.getFullYear()}
        startDate={startDate}
        endDate={endDate}
        onDateSelect={handleDateSelect}
        onMonthYearChange={handleSecondCalendarChange}
      />
    </div>
     <div className={styles["range-footer"]}>
     <div className={styles.ranges}>
       {predefinedRanges
         ? predefinedRanges.map((item) => (
             <button
               type="button"
               key={item.label}
               onClick={() =>
                 handlePredefinedRangeSelect({
                   startDate: item.range.startDate,
                   endDate: item.range.endDate,
                 })
               }
             >
               {item.label}
             </button>
           ))
         : null}
     </div>
     <div className={styles.actions}>
       <button onClick={handleCancel}>Cancel</button>
       <button disabled={!endDate} onClick={handleOk}>OK</button>
     </div>
   </div>
   </div>
  );
};

export default Panel;
