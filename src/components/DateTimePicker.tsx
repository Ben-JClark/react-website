import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

interface Props {
  label: string;
  name: string;
  selected: Date | null;
  onChange: (date: Date | null) => void;
}

function DateTimePicker({ label, name, selected, onChange }: Props) {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <br />
      <DatePicker
        id={name}
        name={name}
        selected={selected}
        onChange={onChange}
        showTimeSelect
        dateFormat="Pp"
        className="mb-3"
      ></DatePicker>
    </>
  );
}

export default DateTimePicker;
