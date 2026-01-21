import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";

const PickDate = ({ label, value, onChange, name }) => {
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={label}
          name={name}
          value={value ? dayjs(value) : null}
          onChange={onChange}
        />
      </LocalizationProvider>
    </div>
  );
};

export default PickDate;
