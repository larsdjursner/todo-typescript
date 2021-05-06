import React, { FC, useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { IDatePicker } from "../common/types";

export const DatePicker: FC<IDatePicker> = ({ id, date, updateDate}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(date);

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
      updateDate(date);
    }
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        format="dd/MM/yyyy"
        margin="normal"
        id="date-picker-inline"
        value={selectedDate}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          "aria-label": "change date",
        }}
      />
    </MuiPickersUtilsProvider>
  );
};
