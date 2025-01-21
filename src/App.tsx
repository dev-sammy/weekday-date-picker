import { useState } from "react";
import "./App.css";
import DateRangePicker, {
  WeekDayRange,
} from "./components/DateRangePicker/DateRangePicker";

const RANGE_TEMPLATES = [
  {
    label: "Last 7 Days",
    range: {
      startDate: new Date(new Date().setDate(new Date().getDate() - 7)),
      endDate: new Date(),
    },
  },
  {
    label: "Last 30 Days",
    range: {
      startDate: new Date(
        new Date().setDate(new Date().getDate() - 30)
      ),
      endDate: new Date(),
    },
  },
]

function App() {
  const [selectedValue, setSelectedValue] = useState<WeekDayRange | null>(null);

  const handleWeekdayRangeChange = (value: WeekDayRange) => {
    console.log("Range Values", value);
    setSelectedValue(value);
  };

  return (
    <div>
      <h1>WeekDay Range Picker</h1>
      <DateRangePicker
        onChange={handleWeekdayRangeChange}
        predefinedRanges={RANGE_TEMPLATES}
      />

      {selectedValue && (
        <div className="date-range">
          <p><b>Selected Date Range</b>: {selectedValue.range.join(' ~ ')}</p>
          <p><b>Weekends</b>: {selectedValue.weekends.join(", ")}</p>
        </div>
      )}
    </div>
  );
}

export default App;
