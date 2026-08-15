import type { datePicker } from "../../../interfaces/datePicker";
import "./DatePicker.scss";

export function DatePicker(datePickerProps: datePicker) {
  const { id, className, testId, onChange } = datePickerProps;
  return (
    <input
      type="date"
      id={id}
      className={className}
      data-test-id={testId}
      onChange={onChange}
    />
  );
}
export default DatePicker;
