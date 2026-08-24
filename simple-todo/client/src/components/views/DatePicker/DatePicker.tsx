import type { datePicker } from "../../../interfaces/datePicker";
import "./DatePicker.scss";

export function DatePicker(datePickerProps: datePicker) {
  const { id, className, testId, value, onChange } = datePickerProps;

  return (
    <input
      type="date"
      id={id}
      className={className}
      data-test-id={testId}
      value={value}
      onChange={onChange}
    />
  );
}
export default DatePicker;
